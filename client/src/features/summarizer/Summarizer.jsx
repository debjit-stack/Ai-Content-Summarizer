// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Send, FileText, Link, Type, Sparkles } from 'lucide-react';
// import { createSummary, clearError } from './summarySlice.js';
// import Spinner from '../../components/Spinner.jsx';
// import toast from 'react-hot-toast';

// const Summarizer = () => {
//   const dispatch = useDispatch();
//   const { loading, error, currentSummary } = useSelector(state => state.summary);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     length: 'medium',
//     contentType: 'text',
//     sourceUrl: '',
//     tags: []
//   });
  
//   const [tagInput, setTagInput] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleAddTag = (e) => {
//     if (e.key === 'Enter' && tagInput.trim()) {
//       e.preventDefault();
//       if (!formData.tags.includes(tagInput.trim())) {
//         setFormData(prev => ({
//           ...prev,
//           tags: [...prev.tags, tagInput.trim()]
//         }));
//       }
//       setTagInput('');
//     }
//   };

//   const handleRemoveTag = (tagToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove)
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.title.trim() || !formData.content.trim()) {
//       toast.error('Title and content are required');
//       return;
//     }

//     if (formData.content.length > 50000) {
//       toast.error('Content must be less than 50,000 characters');
//       return;
//     }

//     try {
//       dispatch(clearError());
//       await dispatch(createSummary(formData)).unwrap();
//       toast.success('Summary generated successfully!');
      
//       // Reset form
//       setFormData({
//         title: '',
//         content: '',
//         length: 'medium',
//         contentType: 'text',
//         sourceUrl: '',
//         tags: []
//       });
//     } catch (error) {
//       toast.error(error || 'Failed to generate summary');
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       content: '',
//       length: 'medium',
//       contentType: 'text',
//       sourceUrl: '',
//       tags: []
//     });
//     setTagInput('');
//     dispatch(clearError());
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-xl shadow-lg border border-gray-200">
//         <div className="border-b border-gray-200 p-6">
//           <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
//             <Sparkles className="w-6 h-6 text-blue-500" />
//             <span>Create Summary</span>
//           </h2>
//           <p className="text-gray-600 mt-2">
//             Transform your content into concise, intelligent summaries
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Title Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Title *
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               placeholder="Enter a title for your content..."
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//               maxLength={200}
//               required
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               {formData.title.length}/200 characters
//             </p>
//           </div>

//           {/* Content Type & Source URL */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Content Type
//               </label>
//               <select
//                 name="contentType"
//                 value={formData.contentType}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                 <option value="text">Plain Text</option>
//                 <option value="url">URL / Website</option>
//                 <option value="file">Document</option>
//               </select>
//             </div>

//             {formData.contentType === 'url' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Source URL
//                 </label>
//                 <input
//                   type="url"
//                   name="sourceUrl"
//                   value={formData.sourceUrl}
//                   onChange={handleInputChange}
//                   placeholder="https://example.com"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Summary Length */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Summary Length
//             </label>
//             <div className="flex space-x-4">
//               {[
//                 { value: 'short', label: 'Short', desc: '2-3 sentences' },
//                 { value: 'medium', label: 'Medium', desc: '1-2 paragraphs' },
//                 { value: 'long', label: 'Long', desc: '3-4 paragraphs' }
//               ].map(option => (
//                 <label key={option.value} className="flex-1">
//                   <input
//                     type="radio"
//                     name="length"
//                     value={option.value}
//                     checked={formData.length === option.value}
//                     onChange={handleInputChange}
//                     className="sr-only"
//                   />
//                   <div className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
//                     formData.length === option.value
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}>
//                     <div className="font-medium text-sm">{option.label}</div>
//                     <div className="text-xs text-gray-500">{option.desc}</div>
//                   </div>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Content Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Content *
//             </label>
//             <textarea
//               name="content"
//               value={formData.content}
//               onChange={handleInputChange}
//               placeholder="Paste your content here..."
//               rows={10}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//               maxLength={50000}
//               required
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               {formData.content.length}/50,000 characters
//             </p>
//           </div>

//           {/* Tags Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Tags (optional)
//             </label>
//             <input
//               type="text"
//               value={tagInput}
//               onChange={(e) => setTagInput(e.target.value)}
//               onKeyDown={handleAddTag}
//               placeholder="Add tags and press Enter..."
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             {formData.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {formData.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
//                   >
//                     {tag}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveTag(tag)}
//                       className="ml-2 text-blue-600 hover:text-blue-800"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-4 pt-4 border-t border-gray-200">
//             <button
//               type="submit"
//               disabled={loading || !formData.title.trim() || !formData.content.trim()}
//               className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
//             >
//               {loading ? (
//                 <>
//                   <Spinner size="sm" />
//                   <span>Generating Summary...</span>
//                 </>
//               ) : (
//                 <>
//                   <Send className="w-4 h-4" />
//                   <span>Generate Summary</span>
//                 </>
//               )}
//             </button>
            
//             <button
//               type="button"
//               onClick={resetForm}
//               className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Display Current Summary */}
//       {currentSummary && (
//         <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 animate-fade-in">
//           <div className="border-b border-gray-200 p-6">
//             <h3 className="text-xl font-bold text-gray-900">Generated Summary</h3>
//             <p className="text-sm text-gray-500 mt-1">
//               Created {new Date(currentSummary.createdAt).toLocaleString()}
//             </p>
//           </div>
          
//           <div className="p-6">
//             <h4 className="text-lg font-semibold text-gray-800 mb-3">
//               {currentSummary.title}
//             </h4>
            
//             <div className="prose max-w-none">
//               <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//                 {currentSummary.summary}
//               </p>
//             </div>

//             <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
//               <div className="flex items-center space-x-4">
//                 <span>Length: {currentSummary.summaryLength}</span>
//                 <span>Original: {currentSummary.wordCount?.original || 0} words</span>
//                 <span>Summary: {currentSummary.wordCount?.summary || 0} words</span>
//               </div>
              
//               {currentSummary.tags && currentSummary.tags.length > 0 && (
//                 <div className="flex space-x-1">
//                   {currentSummary.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {error && (
//         <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-700">{error}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Summarizer;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Send, FileText, Link, Type, Sparkles, X, Plus, Zap, Target, AlertTriangle } from 'lucide-react';
import { createSummary, clearError } from './summarySlice.js';
import Spinner from '../../components/Spinner.jsx';
import toast from 'react-hot-toast';

const Summarizer = () => {
  const dispatch = useDispatch();
  const { loading, error, currentSummary } = useSelector(state => state.summary);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    length: 'medium',
    contentType: 'text',
    sourceUrl: '',
    tags: []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim()) && formData.tags.length < 10) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    if (formData.content.length > 50000) {
      toast.error('Content must be less than 50,000 characters');
      return;
    }

    try {
      dispatch(clearError());
      await dispatch(createSummary(formData)).unwrap();
      toast.success('Summary generated successfully!');
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        length: 'medium',
        contentType: 'text',
        sourceUrl: '',
        tags: []
      });
      setTagInput('');

    } catch (err) {
      // The unwrap() method throws the error, so we catch it here.
      // The error message is handled by the 'error' state from the slice.
      toast.error(err || 'Failed to generate summary');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      length: 'medium',
      contentType: 'text',
      sourceUrl: '',
      tags: []
    });
    setTagInput('');
    dispatch(clearError());
  };

  const getContentTypeIcon = (type) => {
    const icons = { text: Type, url: Link, file: FileText };
    return icons[type] || Type;
  };

  const getLengthInfo = (length) => {
    const info = {
      short: { desc: '2-3 sentences', icon: '🎯', color: 'from-green-400 to-emerald-500' },
      medium: { desc: '1-2 paragraphs', icon: '⚡', color: 'from-blue-400 to-indigo-500' },
      long: { desc: '3-4 paragraphs', icon: '📖', color: 'from-purple-400 to-pink-500' }
    };
    return info[length];
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary shadow-glow-purple mb-6 animate-bounce-in">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gradient mb-4">
          Create Summary
        </h2>
        <p className="text-xl text-theme-muted max-w-2xl mx-auto leading-relaxed">
          Transform your content into concise, intelligent summaries powered by advanced AI
        </p>
      </div>

      {/* Main Form */}
      <div className="glass-card modern-card">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Input */}
            <div className="floating-label">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('title')}
                onBlur={() => setFocusedField(null)}
                placeholder=" "
                className="input-modern peer"
                maxLength={200}
                required
              />
              <label className={`floating-label-text ${focusedField === 'title' || formData.title ? 'active' : ''}`}>
                Title *
              </label>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-theme-muted">
                  Give your content a descriptive title
                </p>
                <span className="text-xs text-theme-muted">
                  {formData.title.length}/200
                </span>
              </div>
            </div>

            {/* Content Type & Source URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-theme-foreground mb-3">
                  Content Type : Plain Text
                </label>
                <div className="space-y-3">
                  {[
                    // { value: 'text', label: 'Plain Text', icon: Type, desc: 'Direct text input' }
                    // { value: 'url', label: 'URL / Website', icon: Link, desc: 'Web content' },
                    // { value: 'file', label: 'Document', icon: FileText, desc: 'File upload' }
                  ].map(option => {
                    const Icon = option.icon;
                    return (
                      <label key={option.value} className="block">
                        <input
                          type="radio"
                          name="contentType"
                          value={option.value}
                          checked={formData.contentType === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover-lift ${
                          formData.contentType === option.value
                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-glow'
                            : 'border-theme hover:border-blue-300'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-5 h-5 ${
                              formData.contentType === option.value ? 'text-blue-600' : 'text-theme-muted'
                            }`} />
                            <div>
                              <div className="font-medium text-sm text-theme-foreground">
                                {option.label}
                              </div>
                              <div className="text-xs text-theme-muted">
                                {option.desc}
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* {formData.contentType === 'url' && (
                <div className="animate-slide-in-right">
                  <label className="block text-sm font-semibold text-theme-foreground mb-3">
                    Source URL
                  </label>
                  <div className="floating-label">
                    <input
                      type="url"
                      name="sourceUrl"
                      value={formData.sourceUrl}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="input-modern peer"
                    />
                    <label>https://example.com</label>
                  </div>
                </div>
              )} */}
            </div>

            {/* Summary Length */}
            <div>
              <label className="block text-sm font-semibold text-theme-foreground mb-4">
                Summary Length
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['short', 'medium', 'long'].map(option => {
                  const info = getLengthInfo(option);
                  return (
                    <label key={option} className="block">
                      <input
                        type="radio"
                        name="length"
                        value={option}
                        checked={formData.length === option}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover-lift morph ${
                        formData.length === option
                          ? `border-transparent bg-gradient-to-br ${info.color} text-white shadow-glow`
                          : 'border-theme hover:border-blue-300 bg-theme-card'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{info.icon}</div>
                          <div className="font-bold text-sm capitalize">
                            {option}
                          </div>
                          <div className={`text-xs mt-1 ${
                            formData.length === option ? 'text-white/80' : 'text-theme-muted'
                          }`}>
                            {info.desc}
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Content Input */}
            <div>
              <label className="block text-sm font-semibold text-theme-foreground mb-3">
                Content *
              </label>
              <div className="relative">
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('content')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Paste your content here..."
                  rows={12}
                  className={`input-modern resize-none transition-all duration-300 ${
                    focusedField === 'content' ? 'ring-2 ring-blue-500 shadow-glow' : ''
                  }`}
                  maxLength={50000}
                  required
                />
                <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                  <span className="text-xs text-theme-muted bg-theme-background px-2 py-1 rounded">
                    {formData.content.length}/50,000
                  </span>
                </div>
              </div>
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-sm font-semibold text-theme-foreground mb-3">
                Tags (optional)
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tags and press Enter..."
                    className="input-modern pr-12"
                    disabled={formData.tags.length >= 10}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Plus className="w-4 h-4 text-theme-muted" />
                  </div>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 animate-fade-in">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-gradient-primary text-white shadow-md hover-lift"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-theme-muted">
                  {formData.tags.length}/10 tags added
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-theme">
              <button
                type="submit"
                disabled={loading || !formData.title.trim() || !formData.content.trim()}
                className="btn-gradient flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span>Generating Summary...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Generate Summary</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 border-2 border-theme text-theme-foreground font-semibold rounded-lg hover:bg-theme-card transition-all duration-300 hover-lift"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Display Current Summary */}
      {currentSummary && (
        <div className="glass-card animate-slide-in-up modern-card">
          <div className="border-b border-theme p-6 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-success flex items-center justify-center shadow-glow-green">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-theme-foreground">Generated Summary</h3>
                <p className="text-sm text-theme-muted">
                  Created {new Date(currentSummary.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <h4 className="text-2xl font-bold text-gradient">
              {currentSummary.title}
            </h4>
            
            <div className="prose prose-lg max-w-none text-theme-foreground leading-relaxed">
              <p className="whitespace-pre-line">
                {currentSummary.summary}
              </p>
            </div>

            <div className="pt-6 border-t border-theme flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-theme-muted">
                <span className="font-medium">Length: <span className="font-bold text-theme-foreground capitalize">{currentSummary.summaryLength}</span></span>
                <span>Original: <span className="font-bold text-theme-foreground">{currentSummary.wordCount?.original || 0} words</span></span>
                <span>Summary: <span className="font-bold text-theme-foreground">{currentSummary.wordCount?.summary || 0} words</span></span>
              </div>
              
              {currentSummary.tags && currentSummary.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentSummary.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-theme-card border border-theme text-theme-muted rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3 animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
