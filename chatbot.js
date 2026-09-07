/* ============================================================
   Standard Practice — Shared Chat Widget
   Include this one file on every page:
     <script src="chatbot.js"></script>
   It injects the widget markup, wires up open/close and quick
   replies, and answers based on keyword matching below.
   To change what the bot says, edit CHAT_RULES — nothing else
   needs to change.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. KEYWORD RULES
     Each rule has a list of keywords (lowercase, no punctuation)
     and the response shown when any keyword is found in the
     user's message. First matching rule wins, so put more
     specific rules above general ones.
  ---------------------------------------------------------- */
  const CHAT_RULES = [
    {
      keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
      response: "Hello! I'm the Standard Practice assistant. You can ask me about our services, offices, or how to get in touch."
    },
    {
      keywords: ["service", "services", "practice", "practices", "what do you do", "offer"],
      response: "We offer five core services: Audit and Assurance, Taxation, Corporate Services, Advisory, and Accounting Services. Want details on any of these?"
    },
    {
      keywords: ["audit", "assurance"],
      response: "Our Audit and Assurance practice delivers independent, rigorous assurance for stakeholders across every sector we serve."
    },
    {
      keywords: ["tax", "taxation"],
      response: "Our Taxation practice covers compliant, efficient tax planning and advisory across the jurisdictions we operate in."
    },
    {
      keywords: ["corporate", "corporate"],
      response: "Our Corporate Services team provides practical, industry-tested services to help organisations run better."
    },
    {
      keywords: ["actuarial", "actuary", "pension", "insurance"],
      response: "Our Actuarial Services practice handles risk and valuation modelling for pensions, insurance and beyond."
    },
    {
      keywords: ["advisory", "advice", "board", "advise"],
      response: "Our Advisory practice provides board-level counsel for the decisions that shape an organisation's future."
    },
    {
      keywords: ["accounting", "bookkeeping", "books"],
      response: "Our Accounting Services team keeps your books and reporting accurate, so leadership can focus on the business."
    },
    {
      keywords: ["location", "office", "address", "where are you", "based"],
      response: "We're headquartered on Ikorodu Road, Fadeyi in Lagos, with a second office at Wuse Zone 3 in Abuja — plus representation in the UK, US, Kenya and Ghana."
    },
    {
      keywords: ["contact", "phone", "number", "call", "email", "reach"],
      response: "You can reach us at +234-805-606-9623 or info@standardpracticeprofessional.com. Prefer to write in? Head to our Contact page."
    },
    {
      keywords: ["hour", "hours", "open", "time", "when"],
      response: "Our team is available Monday to Friday, 9:00 – 18:00 WAT."
    },
    {
      keywords: ["price", "cost", "fee", "pricing", "how much"],
      response: "Fees depend on scope, so the best next step is a short call with a partner — they'll give you a clear, transparent quote."
    },
    {
      keywords: ["sector", "industry", "industries"],
      response: "We work across agriculture, healthcare, energy, manufacturing, financial services, oil and gas, technology and telecommunications, real estate, and more."
    },
    {
      keywords: ["experience", "how long", "years", "track record"],
      response: "Our partners bring over twenty-five years of cumulative experience and have completed 700+ engagements across diverse industries."
    },
    {
      keywords: ["confidential", "privacy", "secure", "nda"],
      response: "Absolutely — integrity is a core value here, and every engagement is governed by strict confidentiality and conflict-of-interest protocols."
    },
    {
      keywords: ["career", "careers", "job", "jobs", "hiring", "vacancy", "vacancies", "apply", "cv", "resume"],
      response: "We don't post a fixed list of openings — send your CV and the practice area you're interested in to info@standardpracticeprofessional.com with the subject \"Career Enquiry\", and our team will follow up."
    },
    {
      keywords: ["thank", "thanks", "appreciate"],
      response: "You're welcome! Anything else I can help with?"
    }
  ];

  const FALLBACK_RESPONSE =
    "I don't have a ready answer for that yet — the fastest way to get a precise answer is to reach out directly at info@standardpracticeprofessional.com or +234-805-606-9623.";

  /* ----------------------------------------------------------
     2. WIDGET MARKUP (injected once per page)
  ---------------------------------------------------------- */
  const WIDGET_HTML = `
    <div class="chat-widget">
      <div class="chat-box" id="chatBox">
        <div class="chat-header">
          <div class="chat-header-info">
            <span class="chat-header-title">Ask Standard</span>
            <span class="chat-header-status">Standard Assistant Online</span>
          </div>
          <button class="chat-close" id="chatClose">&times;</button>
        </div>
        <div class="chat-body" id="chatBody">
          <div class="chat-msg bot">
            Welcome to Standard Practice. I can help you explore our services, share our story, or connect you with our team. Where would you like to start?
            <div class="chat-options">
              <button class="chat-chip" data-quick-reply="Explore services">Explore services</button>
              <button class="chat-chip" data-quick-reply="Book a consultation">Book a consultation</button>
              <button class="chat-chip" data-quick-reply="Read our insights">Read our insights</button>
            </div>
          </div>
        </div>
        <form class="chat-input-area" id="chatForm">
          <input type="text" id="chatInput" placeholder="Ask about our services…" autocomplete="off" />
          <button type="submit">Send</button>
        </form>
      </div>

      <button class="chat-trigger" id="chatTrigger">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        <span>Ask Standard</span>
      </button>
    </div>
  `;

  /* ----------------------------------------------------------
     3. LOGIC
  ---------------------------------------------------------- */
  function findResponse(message) {
    const text = message.toLowerCase();
    for (const rule of CHAT_RULES) {
      if (rule.keywords.some((kw) => text.includes(kw))) {
        return rule.response;
      }
    }
    return FALLBACK_RESPONSE;
  }

  function appendMessage(body, text, sender) {
    const msg = document.createElement("div");
    msg.className = "chat-msg " + sender;
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function handleUserMessage(body, text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    appendMessage(body, trimmed, "user");
    // Small delay so the reply feels like a response, not an echo.
    setTimeout(() => {
      appendMessage(body, findResponse(trimmed), "bot");
    }, 400);
  }

  function initChatWidget() {
    document.body.insertAdjacentHTML("beforeend", WIDGET_HTML);

    const chatBox = document.getElementById("chatBox");
    const chatTrigger = document.getElementById("chatTrigger");
    const chatClose = document.getElementById("chatClose");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatBody = document.getElementById("chatBody");

    // Start closed regardless of what style.css assumes.
    chatBox.classList.remove("open");
    chatBox.style.display = "none";

    function openChat() {
      chatBox.classList.add("open");
      chatBox.style.display = "flex";
    }
    function closeChat() {
      chatBox.classList.remove("open");
      chatBox.style.display = "none";
    }

    chatTrigger.addEventListener("click", () => {
      const isOpen = chatBox.classList.contains("open");
      isOpen ? closeChat() : openChat();
    });

    chatClose.addEventListener("click", closeChat);

    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleUserMessage(chatBody, chatInput.value);
      chatInput.value = "";
    });

    // Quick-reply chips (delegated, since chips are re-created via innerHTML)
    chatBody.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-quick-reply]");
      if (chip) {
        handleUserMessage(chatBody, chip.dataset.quickReply);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatWidget);
  } else {
    initChatWidget();
  }
})();