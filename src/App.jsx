import { useState } from "react";
import {
  Bike,
  MessageCircle,
  Building2,
  ClipboardList
} from "lucide-react";
import "./App.css";

export default function App() {
  const [aba, setAba] = useState("empresa");

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <Bike size={36} />
          <span>Expresso Silva</span>
        </div>
      </header>

      <nav className="menu">
        <button onClick={() => setAba("empresa")}>
          <Building2 size={18} /> Empresa
        </button>
        <button onClick={() => setAba("orcamento")}>
          <ClipboardList size={18} /> Orçamento
        </button>
        <button onClick={() => setAba("feedback")}>
          <MessageCircle size={18} /> Feedback
        </button>
      </nav>

      <main className="conteudo">
        {aba === "empresa" && (
          <section>
            <h2>Sobre a Expresso Silva</h2>
            <p>
              Estamos no mercado há mais de <strong>20 anos</strong>, atendendo
              grandes empresas e clientes em geral.
            </p>
            <ul>
              <li>📍 BH e Região Metropolitana</li>
              <li>🚚 Todo o estado de Minas Gerais</li>
              <li>📄 Cartórios e documentos</li>
              <li>📦 Encomendas e peças de caminhão</li>
              <li>🏢 Bancos e empresas</li>
            </ul>
          </section>
        )}

        {aba === "orcamento" && (
          <section>
            <h2>Solicitar Orçamento</h2>
            <p>
              Preencha os dados e você será direcionado automaticamente para o
              WhatsApp da empresa.
            </p>

            <a
              className="botao-whats"
              href="https://wa.me/5531999999999"
              target="_blank"
            >
              Solicitar pelo WhatsApp
            </a>
          </section>
        )}

        {aba === "feedback" && (
          <section>
            <h2>Feedback</h2>
            <p>
              Deixe sua sugestão, elogio ou reclamação para melhorarmos nossos
              serviços.
            </p>

            <textarea placeholder="Digite seu feedback..." />
            <button className="enviar">Enviar</button>
          </section>
        )}
      </main>
    </div>
  );
}
