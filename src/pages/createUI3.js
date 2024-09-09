
import React, { useState } from 'react';
import { Send, PlayCircle, Globe, Mic, Clock, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import {
  contentOptions, destinationOptions, languageOptions,
  durationOptions, narrationOptions, ChannelPrompts
} from '../constant/index.jsx';

const VideoCreationWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    topic: '',
    language: '',
    narrator: '',
    duration: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedData, setAdvancedData] = useState({
    channelType: '',
    storyPrompt: '',
    imageGenPrompt: '',
    imageGenTool: '',
    voiceModel: '',
    imageSlideCount: ''
  });

  const channelTypeOptions = ['Entertainment', 'Education', 'News', 'Lifestyle', 'Technology'];
  const imageGenToolOptions = ['DALL-E', 'Midjourney', 'Stable Diffusion'];
  const voiceModelOptions = ['Default', 'Neural TTS', 'Custom Voice'];

  const handleAdvancedChange = (e) => {
    const { name, value } = e.target;
    setAdvancedData({ ...advancedData, [name]: value });
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };
  const renderAdvancedForm = () => {
    return (
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Advanced Options</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Channel Type</label>
            <select
              name="channelType"
              value={advancedData.channelType}
              onChange={(e) => {
                handleAdvancedChange(e);
                if (ChannelPrompts[e.target.value]) {
                  setAdvancedData(prevData => ({
                    ...prevData,
                    storyPrompt: ChannelPrompts[e.target.value].storyPrompt,
                    imageGenPrompt: ChannelPrompts[e.target.value].ImageGenPrompt
                  }));
                }
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Channel Type</option>
              {Object.keys(ChannelPrompts).map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Story Prompt</label>
            <textarea
              name="storyPrompt"
              value={advancedData.storyPrompt}
              onChange={handleAdvancedChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image Generation Prompt</label>
            <textarea
              name="imageGenPrompt"
              value={advancedData.imageGenPrompt}
              onChange={handleAdvancedChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image Generation Tool</label>
            <select
              name="imageGenTool"
              value={advancedData.imageGenTool}
              onChange={handleAdvancedChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Image Generation Tool</option>
              {imageGenToolOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Voice Model</label>
            <select
              name="voiceModel"
              value={advancedData.voiceModel}
              onChange={handleAdvancedChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Voice Model</option>
              {voiceModelOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image Slide Count</label>
            <input
              type="number"
              name="imageSlideCount"
              value={advancedData.imageSlideCount}
              onChange={handleAdvancedChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition duration-300"
        >
          Generate Video <Check className="ml-2" />
        </button>
      </div>
    );
  };

  const steps = [
    {
      name: 'destination',
      icon: Send,
      label: 'Where to post?',
      options: destinationOptions
    },
    {
      name: 'topic',
      icon: PlayCircle,
      label: 'Video topic',
      options: contentOptions
    },
    {
      name: 'language',
      icon: Globe,
      label: 'Language',
      options: languageOptions
    },
    {
      name: 'narrator',
      icon: Mic,
      label: 'Narrator voice',
      options: narrationOptions
    },
    {
      name: 'duration',
      icon: Clock,
      label: 'Video duration',
      options: durationOptions
    }
  ];

  const handleChange = (value) => {
    setFormData({ ...formData, [steps[step - 1].name]: value });
  };

  const nextStep = () => setStep(step < steps.length ? step + 1 : step);
  const prevStep = () => setStep(step > 1 ? step - 1 : step);

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-2xl">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800">Create Your Video</h1>

      <div className="mb-8">
        <ProgressBar currentStep={step} totalSteps={steps.length} />
      </div>

      <button
        onClick={toggleAdvanced}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300"
      >
        {showAdvanced ? 'Basic' : 'Advanced'}
      </button>

      {showAdvanced ? (
        renderAdvancedForm()
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8">
          <StepContent
            step={steps[step - 1]}
            value={formData[steps[step - 1].name]}
            onChange={handleChange}
          />
        </div>
      )}

      {!showAdvanced && (
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className={`flex items-center px-6 py-3 rounded-full text-indigo-600 font-semibold ${step === 1 ? 'invisible' : ''}`}
          >
            <ChevronLeft className="mr-2" /> Previous
          </button>
          {step < steps.length ? (
            <button
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300"
            >
              Next <ChevronRight className="ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition duration-300"
            >
              Create Video <Check className="ml-2" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ProgressBar = ({ currentStep, totalSteps }) => (
  <div className="w-full bg-indigo-100 rounded-full h-2.5">
    <div
      className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
    ></div>
  </div>
);

const StepContent = ({ step, value, onChange }) => (
  <div className="text-center">
    <step.icon className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
    <h2 className="text-2xl font-semibold mb-6">{step.label}</h2>
    <div className="flex flex-wrap justify-center gap-4">
      {step.options.map((option) => {
        // Determine if the option is an object or a string
        const optionValue = typeof option === 'string' ? option : option.name;
        return (
          <ToggleButton
            key={optionValue}
            option={option}
            isSelected={value === optionValue}
            onClick={() => onChange(optionValue)}
          />
        );
      })}
    </div>
  </div>
);

const ToggleButton = ({ option, isSelected, onClick }) => {
  const optionLabel = typeof option === 'string' ? option : option.name;
  const optionIcon = typeof option === 'object' && option.icon ? option.icon : null;
  const optionAudio = typeof option === 'object' && option.audio ? option.audio : null;

  const handleClick = () => {
    onClick();
    if (optionAudio) {
      const audio = new Audio(optionAudio);
      audio.play();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${isSelected
          ? 'bg-indigo-600 text-white shadow-lg scale-105'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        } flex items-center`}
    >
      {optionIcon && <span className="mr-2">{optionIcon}</span>}
      {optionLabel}
    </button>
  );
};


export default VideoCreationWizard;
