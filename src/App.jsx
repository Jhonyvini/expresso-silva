import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  User, 
  MessageCircle, 
  Info, 
  Star, 
  Plus, 
  Trash2, 
  Search, 
  CheckCircle,
  Clock,
  Loader2,
  DollarSign,
  Briefcase,
  FileText,
  Truck,
  Package,
  Building2,
  AlertCircle,
  ShoppingBag
} from 'lucide-react';

/**
 * CONFIGURAÇÃO E DADOS DE NEGÓCIO
 */
const COMPANY_PHONE = "553134225426"; 
const BASE_COORDS = { lat: -19.8967, lon: -43.9433 }; 

const MIN_PRICE = 10; 
const PRICE_PER_KM = 2; 

const NEIGHBORHOOD_PROMO_PRICE = 10;
const PROMO_BAIRROS = [
  "aparecida", 
  "parque riachuelo", 
  "riachuelo", 
  "cachoeirinha", 
  "senhor bom jesus", 
  "bom jesus"
];

const PRICE_TABLE = {
  "aarao reis": 25, "adelaide": 18, "aeroporto": 22, "agua branca": 28, "alameda da serra": 28, "alfaville": 45, "alipio de melo": 22, "alto caiçara": 19, "alto dos pinheiros": 25, "alto vera cruz": 25, "alvaro camargos": 22, "alvorada": 35, "amazonas": 30, "ana lucia": 18, "anchieta": 20, "aparecida": 10, "araguaia": 35, "areias": 60, "arvoredo": 35, "atalaia": 60,
  "bairro da graça": 18, "bairro das industrias": 25, "bandeirantes": 25, "barreiro": 35, "barro preto": 18, "barroca": 20, "belmont": 30, "belvedere": 25, "betania": 25, "boa vista": 18, "bom jesus": 10, "bonfim": 16, "botafogo": 35, "braunas": 35, "buritis": 25,
  "cabana": 22, "cachoerinha": 10, "caetano furquim": 20, "caiçara": 20, "calafate": 18, "california": 25, "camargos": 25, "campina verde": 35, "campo alegre": 25, "canada": 35, "candelaria": 30, "cardoso": 30, "carlos prates": 16, "carmo sion": 20, "carrefour": 25, "casa branca": 18, "castanheira": 30, "castelo": 22, "ceasa": 35, "centro": 20, "ceu anil": 30, "ceu azul": 25, "cidade industrial": 25, "cidade jardim": 20, "cidade nova": 18, "colegio batista": 18, "concordia": 18, "coqueiros": 25, "coraçao eucaristico": 17, "cristina": 40, "cruzeiro": 18,
  "diamante": 35, "dom bosco": 20, "dom cabral": 18, "dom joaquim": 18, "dom silverio": 25, "dona clara": 20,
  "eldorado": 30, "engenho nogueira": 20, "ermelinda": 20, "esplanada": 25, "estoril": 20, "estrela dalva": 25, "europa": 35,
  "fernao dias": 20, "fiat": 50, "floramar": 25, "floresta": 20, "funcionarios": 20,
  "gamelereira": 20, "gloria": 20, "goiania": 20, "grajau": 18, "guarani": 20, "gutierrez": 20,
  "havai": 25, "heliopolis": 22, "horto": 20,
  "inconfidentes": 30, "ipanema": 22, "ipiranga": 18, "itapoa": 25, "industrial": 25,
  "jaqueline": 25, "jaragua": 18, "jardim america": 20, "jardim canada": 35, "justinopolis": 50,
  "lagoa": 30, "lagoinha": 16, "laranjeira": 50, "leticia": 25, "liberdade": 20, "lindeia": 35, "lourdes": 15, "luxemburgo": 25,
  "madre gertrudes": 22, "mangabeiras": 18, "milionarios": 30,
  "nacional": 35, "nazare": 20, "nova floresta": 16, "nova suiça": 18, "novo progresso": 24,
  "ouro preto": 18, "padre eustaquio": 16, "palmares": 16, "pampulha": 30, "planalto": 25, "prado": 16,
  "sagrada familia": 20, "santa amelia": 20, "santa efigenia": 20, "santa lucia": 20, "santa monica": 25, "santa tereza": 16, "santo agostinho": 18, "santo andre": 15, "santo antonio": 20, "savassi": 20, "serra": 20, "sion": 20, "santa ines": 20, "santa rosa": 20, "santa luzia": 50,
  "venda nova": 30, "vila da serra": 35, "vista alegre": 20
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="bg-white p-2 rounded-full border-2 border-blue-900 shadow-md">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-800">
        <circle cx="7" cy="18" r="3" />
        <circle cx="17" cy="18" r="3" />
        <path d="M10 18h4" />
        <path d="M12 12l2 3h5l-2-7h-3l-2 4z" />
        <rect x="3" y="11" width="5" height="5" rx="1" fill="currentColor" className="text-red-600" />
        <path d="M13 5l2 3" />
        <circle cx="15" cy="4" r="1.5" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-black italic tracking-tighter text-blue-900 leading-none">EXPRESSO</span>
      <span className="text-lg font-bold text-red-600 leading-none tracking-wide">SILVA</span>
    </div>
  </div>
);

const AddressInput = ({ label, value, onChange, onDataFound, placeholder, hasError }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef(null);

  const fetchAddresses = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5&viewbox=-44.1,-19.7,-43.8,-20.1&bounded=1&countrycodes=br&featuretype=settlement,street`;
      
      const response = await fetch(url, { headers: { 'Accept-Language': 'pt-BR' } });
      const data = await response.json();
      
      const formatted = data.map(item => {
        const road = item.address.road || item.address.pedestrian || item.display_name.split(',')[0];
        const suburb = item.address.suburb || item.address.city_district || '';
        const city = item.address.city || item.address.town || 'BH';
        const houseNumber = item.address.house_number || '';

        return {
          display: road + (houseNumber ? `, ${houseNumber}` : ''),
          suburb: suburb,
          city: city,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          full: item.display_name
        };
      });
      setSuggestions(formatted);
      setShowSuggestions(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(val);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => fetchAddresses(val), 500);
  };

  const selectAddress = (addr) => {
    const currentDigits = value.match(/\d+/);
    const typedNumber = currentDigits ? currentDigits[0] : "";
    let finalString = addr.display;
    if (!finalString.match(/\d+/) && typedNumber) {
        finalString += `, ${typedNumber}`;
    }
    if (addr.suburb) finalString += ` - ${addr.suburb}`;
    if (addr.city) finalString += `, ${addr.city}`;

    onChange(finalString);
    onDataFound({ bairro: addr.suburb, lat: addr.lat, lon: addr.lon });
    setShowSuggestions(false);
  };

  return (
    <div className="relative mb-3">
      <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
        <MapPin size={14} className={hasError ? "text-red-500 animate-pulse" : "text-red-500"}/> {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder || "Nome da rua, número..."}
          className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm shadow-sm transition-all ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}
        />
        <div className="absolute left-3 top-3.5 text-gray-400">
          {loading ? <Loader2 size={18} className="animate-spin text-blue-500" /> : <Search size={18} />}
        </div>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)}></div>
          <ul className="absolute z-50 w-full bg-white border border-gray-200 shadow-2xl rounded-b-xl mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((addr, idx) => (
              <li key={idx} onClick={() => selectAddress(addr)} className="p-3 hover:bg-blue-50 cursor-pointer text-xs text-gray-700 border-b flex items-start gap-3 transition-colors">
                <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col overflow-hidden">
                  <span className="font-bold text-gray-900 truncate">{addr.display}</span>
                  <span className="text-[10px] text-gray-500 truncate">{addr.full}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const QuoteTab = () => {
  const [deliveryObject, setDeliveryObject] = useState('');
  const [stops, setStops] = useState([
    { type: 'pickup', address: '', contact: '', bairro: '', price: 0, lat: null, lon: null },
    { type: 'delivery', address: '', contact: '', bairro: '', price: 0, lat: null, lon: null }
  ]);
  const [showErrors, setShowErrors] = useState(false);

  const calculatePrice = (stop) => {
    if (!stop.lat || !stop.lon) return 0;
    const bairroLimpo = (stop.bairro || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const isPromo = PROMO_BAIRROS.some(b => bairroLimpo.includes(b));
    if (isPromo) return NEIGHBORHOOD_PROMO_PRICE;

    const dist = getDistance(BASE_COORDS.lat, BASE_COORDS.lon, stop.lat, stop.lon);
    if (dist * 2 > 60) return (dist * 2) * 1.40;

    const foundKey = Object.keys(PRICE_TABLE).find(k => bairroLimpo.includes(k) || k.includes(bairroLimpo));
    if (foundKey) return PRICE_TABLE[foundKey];

    const calculated = MIN_PRICE + (dist * PRICE_PER_KM);
    return Math.max(MIN_PRICE, calculated);
  };

  const updateStop = (index, field, value) => {
    const newStops = [...stops];
    newStops[index][field] = value;
    setStops(newStops);
  };

  const handleDataFound = (index, data) => {
    const newStops = [...stops];
    newStops[index].bairro = data.bairro;
    newStops[index].lat = data.lat;
    newStops[index].lon = data.lon;
    newStops[index].price = calculatePrice(newStops[index]);
    setStops(newStops);
  };

  const totalPrice = stops.reduce((acc, s) => acc + s.price, 0);

  const isFormValid = deliveryObject.trim() !== '' && stops.every(stop => stop.address.trim() !== '' && stop.contact.trim() !== '');

  const generateWhatsAppLink = () => {
    if (!isFormValid) {
      setShowErrors(true);
      return;
    }
    
    let message = `Olá, Expresso Silva! 🏍️💨\n\n*NOVO PEDIDO DE FRETE*\n`;
    message += `📦 *O que levar:* *${deliveryObject}*\n\n`;
    
    stops.forEach((stop, i) => {
      const icon = stop.type === 'pickup' ? '📍' : '🏁';
      const label = stop.type === 'pickup' ? '*COLETA*' : `*ENTREGA* ${stops.length > 2 ? i : ''}`;
      message += `${icon} ${label}\n`;
      message += `🛣️ *End:* ${stop.address}\n`;
      message += `👤 *Nome/Ref:* ${stop.contact}\n\n`;
    });
    message += `💰 *VALOR ESTIMADO:* R$ ${totalPrice.toFixed(2).replace('.', ',')}\n`;
    message += `---`;
    window.open(`https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="pb-24 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 rounded-3xl text-white shadow-xl mb-6 flex justify-between items-center relative overflow-hidden">
        <div className="z-10">
          <h2 className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Valor do Frete</h2>
          <div className="flex items-baseline gap-1">
             <span className="text-xl font-medium">R$</span>
             <span className="text-4xl font-black italic">{totalPrice.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
        <DollarSign size={60} className="absolute right-[-10px] bottom-[-10px] opacity-20 rotate-12" />
      </div>

      <div className={`bg-white rounded-2xl shadow-sm border p-4 mb-6 transition-all ${showErrors && !deliveryObject ? 'border-red-300 ring-1 ring-red-100 bg-red-50' : 'border-gray-100'}`}>
        <label className="block text-sm font-black text-gray-700 mb-2 flex items-center gap-2">
          <ShoppingBag size={18} className="text-blue-600" /> O que vamos entregar?
        </label>
        <input 
          type="text" 
          placeholder="Ex: Documentos, Marmita, Peças..."
          className={`w-full p-3 border rounded-xl text-sm transition-all focus:ring-2 focus:ring-blue-500 ${showErrors && !deliveryObject ? 'border-red-400 bg-white' : 'border-gray-200 bg-gray-50'}`}
          value={deliveryObject}
          onChange={(e) => setDeliveryObject(e.target.value)}
        />
        {showErrors && !deliveryObject && <p className="text-[10px] text-red-500 font-bold mt-1">Este campo é obrigatório!</p>}
      </div>

      <div className="space-y-4">
        {stops.map((stop, index) => (
          <div key={index} className={`bg-white rounded-2xl shadow-sm border p-5 transition-all ${showErrors && (!stop.address || !stop.contact) ? 'border-red-300 ring-1 ring-red-100' : 'border-gray-100'}`}>
            <div className="flex justify-between items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${stop.type === 'pickup' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                {stop.type === 'pickup' ? 'Ponto de Coleta' : `Ponto de Entrega ${stops.length > 2 ? index : ''}`}
              </span>
              {index > 1 && (
                <button onClick={() => setStops(stops.filter((_, i) => i !== index))} className="text-red-400 p-1 hover:bg-red-50 rounded-full">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            
            <AddressInput 
              label={stop.type === 'pickup' ? "Onde retiramos?" : "Onde entregamos?"}
              value={stop.address}
              onChange={(val) => updateStop(index, 'address', val)}
              onDataFound={(data) => handleDataFound(index, data)}
              hasError={showErrors && !stop.address}
            />
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="relative">
                <User size={14} className={`absolute left-3 top-3 ${showErrors && !stop.contact ? 'text-red-500' : 'text-gray-400'}`} />
                <input 
                  type="text" 
                  placeholder={stop.type === 'pickup' ? "Quem entrega?" : "Quem recebe?"}
                  className={`w-full p-2.5 pl-9 border rounded-xl text-xs transition-colors ${showErrors && !stop.contact ? 'bg-red-50 border-red-300 placeholder-red-300' : 'bg-gray-50 border-gray-100'}`}
                  value={stop.contact}
                  onChange={(e) => updateStop(index, 'contact', e.target.value)}
                />
              </div>
              <div className={`flex items-center justify-center rounded-xl font-bold text-sm bg-gray-50 ${stop.price > 0 ? 'text-green-600' : 'text-gray-300'}`}>
                {stop.price > 0 ? (
                  <span className="flex items-center gap-1">
                    {PROMO_BAIRROS.some(b => (stop.bairro || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(b)) && <Star size={12} className="text-yellow-500 fill-yellow-500"/>}
                    R$ {stop.price.toFixed(2)}
                  </span>
                ) : 'R$ 0,00'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setStops([...stops, { type: 'delivery', address: '', contact: '', bairro: '', price: 0, lat: null, lon: null }])} 
        className="mt-6 w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-500 transition-all"
      >
        <Plus size={20} /> Adicionar destino
      </button>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-40 md:static">
        <button 
          onClick={generateWhatsAppLink} 
          className={`w-full font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 text-lg transition-all ${isFormValid ? 'bg-green-600 text-white hover:bg-green-700 active:scale-95' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          {isFormValid ? <MessageCircle size={26} /> : <AlertCircle size={26} />}
          {isFormValid ? 'PEDIR MOTOBOY' : 'DADOS FALTANDO'}
        </button>
      </div>
    </div>
  );
};

const AboutTab = () => (
  <div className="space-y-6 pb-24 animate-fade-in">
    <div className="bg-blue-900 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
      <div className="z-10 relative">
        <h2 className="text-3xl font-black italic mb-2">Expresso Silva</h2>
        <p className="text-blue-200 text-sm leading-relaxed font-medium">Logística inteligente para quem tem pressa.</p>
        <div className="mt-4 flex items-center gap-2 text-xs font-bold bg-white/10 p-2 rounded-lg w-fit">
           <MapPin size={14} className="text-red-400" /> Rua Paranaíba, 337 - Aparecida
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Truck size={20}/>
            </div>
            <p className="text-xs font-black text-gray-800">Cobertura</p>
            <p className="text-[10px] text-gray-400">BH e Região</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock size={20}/>
            </div>
            <p className="text-xs font-black text-gray-800">Agilidade</p>
            <p className="text-[10px] text-gray-400">Entregas Urgentes</p>
        </div>
    </div>

    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
        <Briefcase className="text-red-600" size={20} /> Nossos Serviços
      </h3>
      <div className="grid gap-3">
        {[
          { text: "Coletas e entregas em geral", icon: <Truck size={18}/> },
          { text: "Serviços bancários e cartórios", icon: <Building2 size={18}/> },
          { text: "Encomendas urgentes", icon: <Clock size={18}/> },
          { text: "Peças e autopeças", icon: <Package size={18}/> },
          { text: "Contratos e malotes", icon: <FileText size={18}/> }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 group hover:bg-blue-50 transition-colors">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              {React.cloneElement(item.icon, { className: "text-blue-600" })}
            </div>
            <span className="text-gray-700 text-sm font-bold">{item.text}</span>
            <CheckCircle className="ml-auto text-green-500" size={16} />
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gray-800 p-6 rounded-3xl text-white text-center">
      <p className="text-xs opacity-60 uppercase tracking-widest font-bold mb-2">Central de Atendimento</p>
      <p className="text-xl font-black">(31) 3422-5426</p>
    </div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('quote');
  const [rating, setRating] = useState(0);

  const cssStyles = `
    .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
  `;

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center selection:bg-blue-100">
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      <div className="w-full max-w-md bg-[#fafafa] min-h-screen flex flex-col shadow-2xl relative border-x border-gray-200">
        <header className="bg-white p-5 shadow-sm sticky top-0 z-40 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ativo</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 overflow-y-auto">
          {activeTab === 'quote' && <QuoteTab />}
          {activeTab === 'about' && <AboutTab />}
          {activeTab === 'feedback' && (
             <div className="text-center p-10 bg-white rounded-3xl shadow-sm border border-gray-100 animate-fade-in">
               <div className="bg-yellow-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Star size={40} className="text-yellow-400" fill={rating > 0 ? "currentColor" : "none"} />
               </div>
               <h2 className="text-2xl font-black text-gray-800">Sua Opinião</h2>
               <p className="text-sm text-gray-500 mt-2">Como foi sua experiência com o app?</p>
               
               <div className="flex justify-center gap-2 mt-8">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button 
                     key={star} 
                     onClick={() => setRating(star)}
                     className="transition-transform active:scale-90"
                   >
                     <Star 
                       size={36} 
                       className={`transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`} 
                       fill={star <= rating ? "currentColor" : "none"}
                     />
                   </button>
                 ))}
               </div>

               {rating > 0 && (
                 <div className="mt-8 animate-fade-in">
                    <p className="text-sm font-bold text-blue-600 mb-4">Obrigado pela avaliação!</p>
                    <button 
                      className="w-full py-3 bg-gray-100 rounded-xl text-gray-600 font-bold text-sm"
                      onClick={() => setRating(0)}
                    >
                      Limpar
                    </button>
                 </div>
               )}
             </div>
          )}
        </main>

        <nav className="bg-white border-t border-gray-100 sticky bottom-0 z-50 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <div className="flex justify-around items-center h-20">
            <button onClick={() => setActiveTab('about')} className={`flex flex-col items-center w-full transition-all ${activeTab === 'about' ? 'text-blue-700 scale-110' : 'text-gray-300'}`}>
              <Info size={24} /><span className="text-[9px] font-black uppercase mt-1">Empresa</span>
            </button>
            <button onClick={() => setActiveTab('quote')} className={`relative -top-6 p-5 rounded-3xl shadow-2xl transition-all ${activeTab === 'quote' ? 'bg-blue-800 text-white' : 'bg-gray-400 text-white'}`}>
              <MapPin size={28} />
            </button>
            <button onClick={() => setActiveTab('feedback')} className={`flex flex-col items-center w-full transition-all ${activeTab === 'feedback' ? 'text-blue-700 scale-110' : 'text-gray-300'}`}>
              <Star size={24} /><span className="text-[9px] font-black uppercase mt-1">Feedback</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;
