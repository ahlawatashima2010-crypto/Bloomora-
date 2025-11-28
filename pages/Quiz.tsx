
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../components/UI';
import { MOCK_PRODUCTS } from '../constants';

const QUESTIONS = [
  {
    id: 1,
    question: "How much natural light does your space get?",
    options: [
      { label: "Blindingly Bright (Direct Sun)", value: "Bright" },
      { label: "Nice & Sunny (Indirect)", value: "Medium" },
      { label: "Wait, you guys have windows?", value: "Low" },
    ]
  },
  {
    id: 2,
    question: "How often will you remember to water it?",
    options: [
      { label: "I'm a helicopter plant parent (Often)", value: "High" },
      { label: "Once a week, maybe?", value: "Medium" },
      { label: "I usually forget until it droops", value: "Low" },
    ]
  },
  {
    id: 3,
    question: "Do you have furry friends running around?",
    options: [
      { label: "Yes, and they eat everything!", value: "Yes" },
      { label: "Nope, just me.", value: "No" },
    ]
  },
  {
    id: 4,
    question: "What's your plant vibe?",
    options: [
      { label: "Jungle Maximalist", value: "Big" },
      { label: "Minimalist Zen", value: "Small" },
    ]
  }
];

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (val: string) => {
    setAnswers({ ...answers, [step]: val });
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        calculateResult();
        setLoading(false);
      }, 1500);
    }
  };

  const calculateResult = () => {
    // Mock logic based on last answer or random for demo
    setResult("The Minimalist");
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-natural">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="font-serif text-2xl font-bold text-charcoal">Analyzing your vibe...</h2>
        <p className="text-gray-500">Consulting the plant spirits</p>
      </div>
    );
  }

  if (result) {
    const recommended = MOCK_PRODUCTS.slice(0, 3);
    return (
      <div className="min-h-screen bg-natural/50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Your Plant Personality</span>
          <h1 className="font-serif text-5xl font-bold text-charcoal mb-6">{result}</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            You appreciate clean lines, low maintenance, and plants that make a statement without screaming for attention. Here are your perfect matches.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {recommended.map(p => (
               <div key={p.id} className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 transition-transform cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
                  <img src={p.image} className="w-full h-48 object-cover rounded-lg mb-4" alt={p.name} />
                  <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                  <p className="text-primary font-bold">₹{p.price}</p>
               </div>
            ))}
          </div>
          
          <div className="flex gap-4 justify-center">
             <Button onClick={() => { setStep(0); setResult(null); }}>Retake Quiz</Button>
             <Button variant="outline" onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[step];

  return (
    <div className="min-h-screen bg-natural flex items-center justify-center px-6 relative">
      <button onClick={() => navigate(-1)} className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-charcoal transition-colors font-medium">
         <ChevronLeft size={20} /> Back
      </button>

      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200 mb-12 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-8 text-center leading-tight">
          {question.question}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt.value)}
              className="p-6 bg-white rounded-xl border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all text-left group shadow-sm"
            >
              <span className="font-medium text-lg text-charcoal group-hover:text-primary transition-colors">{opt.label}</span>
            </button>
          ))}
        </div>
        
        {step > 0 && (
           <button onClick={() => setStep(step - 1)} className="mt-8 text-gray-500 hover:text-charcoal underline text-sm block mx-auto">
             Go Back
           </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
