import React, { useState, useEffect } from 'react';
import '../styles/ControlBox.css';
import Exhibit from './Exhibit';

const ControlBox = ({ onChangeLevel, onLanguageSelect, language }) => {
    const [level, setLevel] = useState('Beginner');
    const [selectedLang, setSelectedLang] = useState(language);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
  
    // Load available voices and set the default voice based on selected language
    useEffect(() => {
      const synth = window.speechSynthesis;
      
      const loadVoices = () => {
        const availableVoices = synth.getVoices();
        setVoices(availableVoices);
        
        const defaultVoice = availableVoices.find(voice => voice.lang === selectedLang);
        setSelectedVoice(defaultVoice);
      };
  
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      } else {
        loadVoices();
      }
    }, [selectedLang]);
  
    const handleAgeLevelChange = (e) => {
      setLevel(e.target.value);
      onChangeLevel(e.target.value);
    };
  
    const handleLanguageSelect = (e) => {
      const lang = e.target.value;
      setSelectedLang(lang);
      onLanguageSelect(lang);
    };
  
    // TTS function to be passed as a prop
    const handleTTSClick = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLang;  // Set the language based on user selection
      utterance.voice = selectedVoice; // Set the selected voice
      window.speechSynthesis.speak(utterance);
    };
  
    return (
      <div className="control-box">
        <div className="control">
          <label>Age Level</label>
          <select value={level} onChange={handleAgeLevelChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
  
        <div className="control">
          <label>Select Language</label>
          <select value={selectedLang} onChange={handleLanguageSelect}>
            <option value="en-US">English</option>
            <option value="es-ES">Español</option>
            <option value="fr-FR">Français</option>
            <option value="de-DE">Deutsch</option>
            <option value="zh-CN">中文 (Mandarin)</option>
            <option value="pt-PT">Português</option>
            <option value="it-IT">Italiano</option>
          </select>
        </div>
  
        {/* Only one instance of Exhibit should be rendered */}
        <Exhibit level={level} handleTTSClick={handleTTSClick} />
      </div>
    );
  };
  
  export default ControlBox;