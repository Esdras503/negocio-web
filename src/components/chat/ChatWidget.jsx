import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import ChatMessageText from './ChatMessageText';
import QuoteForm from './QuoteForm';
import { agency } from '../../data/agency';
import { buildAgencyWhatsAppUrl } from '../../utils/agency';

const MAX_MESSAGE_LENGTH = 1_000;
const CLIENT_TIMEOUT_MS = 30_000;

const WELCOME_MESSAGE =
  '¡Hola! 👋 Soy el Asistente Nexobyte. Estoy aquí para ayudarte a descubrir cómo una página web puede impulsar tu negocio. ¿Qué tipo de negocio tienes o qué te gustaría crear?';

const QUICK_PROMPTS = [
  {
    label: 'Conocer los servicios',
    message: '¿Qué servicios ofrece Nexobyte?',
  },
  {
    label: 'Ver demos disponibles',
    message: '¿Qué demos tienen disponibles?',
  },
  {
    label: 'Quiero una página web',
    message: 'Quiero una página web para mi negocio.',
  },
  {
    label: 'Consultar información',
    message: 'Quisiera más información sobre Nexobyte.',
  },
];

const FALLBACK_ERROR =
  'No pude conectar con el asistente en este momento. Revisa tu conexión e intenta de nuevo, o escríbenos por WhatsApp.';

let nextMessageId = 0;

function createMessage(role, content, isError = false) {
  nextMessageId += 1;
  return {
    id: `chat-message-${nextMessageId}`,
    role,
    content,
    isError,
  };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [inputError, setInputError] = useState('');

  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesRef = useRef(null);
  const abortRef = useRef(null);
  const requestIdRef = useRef(0);

  const whatsappHref = buildAgencyWhatsAppUrl(agency);

  const abortPendingRequest = useCallback(() => {
    const controller = abortRef.current;
    abortRef.current = null;
    if (controller) controller.abort();
    requestIdRef.current += 1;
  }, []);

  const resetConversation = useCallback(() => {
    abortPendingRequest();
    setMessages([]);
    setDraft('');
    setInputError('');
    setIsSending(false);
    setView('chat');
  }, [abortPendingRequest]);

  const minimizeChat = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => {
      triggerRef.current?.focus({ preventScroll: true });
    }, 260);
  }, []);

  const closeChat = useCallback(() => {
    resetConversation();
    setIsOpen(false);
    window.setTimeout(() => {
      triggerRef.current?.focus({ preventScroll: true });
    }, 260);
  }, [resetConversation]);

  const startNewChat = useCallback(() => {
    resetConversation();
    window.setTimeout(() => textareaRef.current?.focus(), 30);
  }, [resetConversation]);

  const openQuoteForm = () => {
    setInputError('');
    setView('quote');
  };

  const returnToChat = () => {
    setView('chat');
    window.setTimeout(() => textareaRef.current?.focus(), 30);
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const timer = window.setTimeout(() => {
      if (view === 'chat') {
        textareaRef.current?.focus();
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [isOpen, view]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        minimizeChat();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, minimizeChat]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const media = window.matchMedia('(max-width: 640px)');
    const syncBodyLock = () => {
      document.body.classList.toggle('chat-panel-open', media.matches);
    };

    syncBodyLock();
    media.addEventListener('change', syncBodyLock);

    return () => {
      media.removeEventListener('change', syncBodyLock);
      document.body.classList.remove('chat-panel-open');
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const panel = panelRef.current;
    const viewport = window.visualViewport;
    if (!panel || !viewport) return undefined;

    const media = window.matchMedia('(max-width: 640px)');
    const syncViewport = () => {
      if (!media.matches) {
        panel.style.removeProperty('--chat-vv-height');
        panel.style.removeProperty('--chat-vv-offset');
        return;
      }

      panel.style.setProperty('--chat-vv-height', `${viewport.height}px`);
      panel.style.setProperty('--chat-vv-offset', `${viewport.offsetTop}px`);
    };

    syncViewport();
    viewport.addEventListener('resize', syncViewport);
    viewport.addEventListener('scroll', syncViewport);
    media.addEventListener('change', syncViewport);

    return () => {
      viewport.removeEventListener('resize', syncViewport);
      viewport.removeEventListener('scroll', syncViewport);
      media.removeEventListener('change', syncViewport);
      panel.style.removeProperty('--chat-vv-height');
      panel.style.removeProperty('--chat-vv-offset');
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || view !== 'chat') return undefined;

    const frame = window.requestAnimationFrame(() => {
      const container = messagesRef.current;
      if (!container) return;

      container.scrollTo({
        top: container.scrollHeight,
        behavior: isSending ? 'auto' : 'smooth',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, isSending, isOpen, view]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, [draft, view]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    [],
  );

  const appendAssistantError = (content) => {
    setMessages((current) => [
      ...current,
      createMessage('assistant', content, true),
    ]);
  };

  const sendMessage = async (rawText = draft) => {
    if (isSending) return;

    const text = rawText.replace(/\r\n?/g, '\n').trim();

    if (!text) {
      setInputError('Escribe un mensaje antes de enviar.');
      textareaRef.current?.focus();
      return;
    }

    if (text.length > MAX_MESSAGE_LENGTH) {
      setInputError(
        `El mensaje no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`,
      );
      return;
    }

    const history = messages
      .filter((message) => !message.isError)
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));

    const controller = new AbortController();
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    abortRef.current = controller;

    setMessages((current) => [
      ...current,
      createMessage('user', text),
    ]);
    setDraft('');
    setInputError('');
    setIsSending(true);

    let didTimeout = false;
    const timeout = window.setTimeout(() => {
      didTimeout = true;
      controller.abort();
    }, CLIENT_TIMEOUT_MS);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text, history }),
        signal: controller.signal,
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (requestId !== requestIdRef.current) return;

      if (!response.ok) {
        const message =
          typeof data?.error?.message === 'string' && data.error.message
            ? data.error.message
            : FALLBACK_ERROR;
        appendAssistantError(message);
        return;
      }

      const reply =
        typeof data?.reply === 'string' ? data.reply.trim() : '';

      if (!reply) {
        appendAssistantError(
          'No pude generar una respuesta en este momento. Intenta de nuevo o escríbenos por WhatsApp.',
        );
        return;
      }

      setMessages((current) => [
        ...current,
        createMessage('assistant', reply),
      ]);
    } catch (error) {
      if (requestId !== requestIdRef.current) return;

      if (error?.name === 'AbortError') {
        if (didTimeout) {
          appendAssistantError(
            'La respuesta tardó demasiado. Intenta de nuevo o escríbenos por WhatsApp.',
          );
        }
        return;
      }

      appendAssistantError(FALLBACK_ERROR);
    } finally {
      window.clearTimeout(timeout);

      if (requestId === requestIdRef.current) {
        setIsSending(false);
      }

      if (abortRef.current === controller) {
        abortRef.current = null;
      }
    }
  };

  const handleComposerKeyDown = (event) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleToggle = () => {
    if (isOpen) {
      minimizeChat();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      className={`chat-widget ${isOpen ? 'chat-widget--open' : ''}`.trim()}
    >
      <aside
        ref={panelRef}
        id="nexobyte-chat-panel"
        className={`chat-widget__panel ${isOpen ? 'is-open' : ''}`.trim()}
        role="dialog"
        aria-modal="false"
        aria-labelledby="nexobyte-chat-title"
        aria-hidden={!isOpen}
        tabIndex={-1}
      >
        <header className="chat-widget__header">
          <div className="chat-widget__identity">
            <span className="chat-widget__avatar" aria-hidden="true">
              <Icon name="sparkles" size={20} />
            </span>
            <div>
              <h2 id="nexobyte-chat-title">
                {view === 'quote' ? 'Preparar cotización' : 'Asistente Nexobyte'}
              </h2>
              <p className="chat-widget__status">
                <span className="chat-widget__status-dot" aria-hidden="true" />
                {view === 'quote'
                  ? 'Solicitud de cotización'
                  : 'Asistente virtual · En línea'}
              </p>
            </div>
          </div>

          <div className="chat-widget__header-actions">
            <button
              className="chat-widget__icon-button"
              type="button"
              onClick={startNewChat}
              aria-label="Iniciar conversación nueva"
              title="Nueva conversación"
            >
              <Icon name="sparkles" size={17} />
            </button>
            <button
              className="chat-widget__icon-button"
              type="button"
              onClick={minimizeChat}
              aria-label="Minimizar chat"
              title="Minimizar"
            >
              <Icon name="minus" size={18} />
            </button>
            <button
              className="chat-widget__icon-button"
              type="button"
              onClick={closeChat}
              aria-label="Cerrar chat y borrar la conversación"
              title="Cerrar"
            >
              <Icon name="close" size={18} />
            </button>
          </div>
        </header>

        {view === 'quote' ? (
          <QuoteForm onBack={returnToChat} />
        ) : (
          <>
            <div
              ref={messagesRef}
              className="chat-widget__messages"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              aria-label="Conversación con el Asistente Nexobyte"
            >
              <div className="chat-message chat-message--assistant">
                <span className="chat-message__author">Asistente Nexobyte</span>
                <div className="chat-message__bubble">
                  <ChatMessageText text={WELCOME_MESSAGE} />
                </div>
              </div>

              {messages.length === 0 && (
                <div
                  className="chat-widget__quick-actions"
                  aria-label="Preguntas rápidas"
                >
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.label}
                      className="chat-widget__quick-action"
                      type="button"
                      onClick={() => sendMessage(prompt.message)}
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message chat-message--${message.role} ${
                    message.isError ? 'chat-message--error' : ''
                  }`.trim()}
                >
                  <span className="chat-message__author">
                    {message.role === 'user' ? 'Tú' : 'Asistente Nexobyte'}
                  </span>
                  <div className="chat-message__bubble">
                    {message.role === 'assistant' ? (
                      <ChatMessageText text={message.content} />
                    ) : (
                      message.content
                    )}
                  </div>
                  {message.isError && whatsappHref && (
                    <a
                      className="chat-message__error-link"
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="whatsapp" size={15} />
                      Escribir por WhatsApp
                    </a>
                  )}
                </div>
              ))}

              {isSending && (
                <div className="chat-message chat-message--assistant">
                  <span className="chat-message__author">Asistente Nexobyte</span>
                  <div className="chat-message__bubble chat-message__bubble--typing">
                    <span
                      className="chat-widget__typing-dots"
                      aria-hidden="true"
                    >
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="sr-only">
                      El asistente está escribiendo
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form
              className="chat-widget__composer"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="chat-widget__composer-tools">
                <button
                  className="chat-widget__quote-trigger"
                  type="button"
                  onClick={openQuoteForm}
                >
                  <Icon name="clipboard" size={15} />
                  Preparar cotización
                </button>
                <span className="chat-widget__hint">
                  Enter envía · Shift + Enter salta línea
                </span>
              </div>

              <label className="sr-only" htmlFor="nexobyte-chat-input">
                Escribe tu mensaje para el Asistente Nexobyte
              </label>
              <div className="chat-widget__input-row">
                <textarea
                  ref={textareaRef}
                  id="nexobyte-chat-input"
                  rows={1}
                  maxLength={MAX_MESSAGE_LENGTH}
                  value={draft}
                  onChange={(event) => {
                    setDraft(event.target.value);
                    if (inputError) setInputError('');
                  }}
                  onKeyDown={handleComposerKeyDown}
                  placeholder="Escribe tu mensaje…"
                />
                <button
                  className="chat-widget__send"
                  type="submit"
                  aria-label="Enviar mensaje"
                  disabled={isSending || !draft.trim()}
                >
                  {isSending ? (
                    <span className="chat-widget__spinner" aria-hidden="true" />
                  ) : (
                    <Icon name="send" size={18} />
                  )}
                </button>
              </div>

              {inputError && (
                <p className="chat-widget__input-error" role="alert">
                  {inputError}
                </p>
              )}

              <p className="chat-widget__disclaimer">
                La IA puede cometer errores. No compartas contraseñas ni datos
                bancarios.
              </p>
            </form>
          </>
        )}
      </aside>

      <div className="chat-widget__launcher">
        {!isOpen && (
          <span className="chat-widget__tooltip" aria-hidden="true">
            ¿Necesitas ayuda?
          </span>
        )}
        <button
          ref={triggerRef}
          className="chat-widget__trigger"
          type="button"
          aria-label={
            isOpen ? 'Minimizar Asistente Nexobyte' : 'Abrir Asistente Nexobyte'
          }
          aria-expanded={isOpen}
          aria-controls="nexobyte-chat-panel"
          onClick={handleToggle}
          title={isOpen ? 'Minimizar chat' : 'Abrir Asistente Nexobyte'}
        >
          <Icon name={isOpen ? 'close' : 'message'} size={27} />
          {!isOpen && (
            <span className="chat-widget__trigger-badge" aria-hidden="true">
              <Icon name="sparkles" size={12} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
