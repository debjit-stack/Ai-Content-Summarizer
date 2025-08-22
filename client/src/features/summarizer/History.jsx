// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Search, 
//   Trash2, 
//   Eye, 
//   Calendar, 
//   FileText, 
//   ChevronLeft, 
//   ChevronRight,
//   Filter,
//   X
// } from 'lucide-react';
// import { 
//   fetchSummaries, 
//   searchSummaries, 
//   deleteSummary, 
//   fetchSummaryById,
//   clearSearchResults,
//   setSearchQuery
// } from './summarySlice.js';
// import Spinner from '../../components/Spinner.jsx';
// import toast from 'react-hot-toast';

// const History = () => {
//   const dispatch = useDispatch();
//   const { 
//     summaries, 
//     searchResults, 
//     searchQuery, 
//     loading, 
//     isSearching, 
//     pagination,
//     currentSummary,
//     error 
//   } = useSelector(state => state.summary);

//   const [localSearchQuery, setLocalSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedSummary, setSelectedSummary] = useState(null);
//   const [filters, setFilters] = useState({
//     length: 'all',
//     contentType: 'all',
//     sortBy: 'newest'
//   });

//   const displaySummaries = searchQuery ? searchResults : summaries;

//   useEffect(() => {
//     if (!searchQuery) {
//       dispatch(fetchSummaries({ page: 1, limit: 10 }));
//     }
//   }, [dispatch, searchQuery]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (localSearchQuery.trim()) {
//       dispatch(setSearchQuery(localSearchQuery.trim()));
//       dispatch(searchSummaries({ 
//         query: localSearchQuery.trim(), 
//         page: 1, 
//         limit: 10 
//       }));
//     }
//   };

//   const handleClearSearch = () => {
//     setLocalSearchQuery('');
//     dispatch(clearSearchResults());
//   };

//   const handleDeleteSummary = async (id, title) => {
//     if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
//       try {
//         await dispatch(deleteSummary(id)).unwrap();
//         toast.success('Summary deleted successfully');
//       } catch (error) {
//         toast.error('Failed to delete summary');
//       }
//     }
//   };

//   const handleViewSummary = async (id) => {
//     try {
//       const result = await dispatch(fetchSummaryById(id)).unwrap();
//       setSelectedSummary(result);
//     } catch (error) {
//       toast.error('Failed to load summary');
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (searchQuery) {
//       dispatch(searchSummaries({ 
//         query: searchQuery, 
//         page: newPage, 
//         limit: pagination.limit 
//       }));
//     } else {
//       dispatch(fetchSummaries({ 
//         page: newPage, 
//         limit: pagination.limit 
//       }));
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 1) return 'Today';
//     if (diffDays === 2) return 'Yesterday';
//     if (diffDays <= 7) return `${diffDays - 1} days ago`;
//     return date.toLocaleDateString();
//   };

//   const getLengthBadgeColor = (length) => {
//     const colors = {
//       short: 'bg-green-100 text-green-800',
//       medium: 'bg-blue-100 text-blue-800',
//       long: 'bg-purple-100 text-purple-800'
//     };
//     return colors[length] || 'bg-gray-100 text-gray-800';
//   };

//   const getContentTypeIcon = (type) => {
//     const icons = {
//       text: FileText,
//       url: Search,
//       file: FileText
//     };
//     const Icon = icons[type] || FileText;
//     return <Icon className="w-4 h-4" />;
//   };

//   if (loading && displaySummaries.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Spinner size="lg" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">Summary History</h2>
//         <p className="text-gray-600">Browse and manage your generated summaries</p>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
//         <div className="flex flex-col sm:flex-row gap-4">
//           {/* Search */}
//           <form onSubmit={handleSearch} className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 value={localSearchQuery}
//                 onChange={(e) => setLocalSearchQuery(e.target.value)}
//                 placeholder="Search summaries by title, content, or tags..."
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               {searchQuery && (
//                 <button
//                   type="button"
//                   onClick={handleClearSearch}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           </form>

//           {/* Filter Toggle */}
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             <Filter className="w-5 h-5" />
//             <span>Filters</span>
//           </button>
//         </div>

//         {/* Filters Panel */}
//         {showFilters && (
//           <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Length
//                 </label>
//                 <select
//                   value={filters.length}
//                   onChange={(e) => setFilters(prev => ({ ...prev, length: e.target.value }))}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 >
//                   <option value="all">All Lengths</option>
//                   <option value="short">Short</option>
//                   <option value="medium">Medium</option>
//                   <option value="long">Long</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Content Type
//                 </label>
//                 <select
//                   value={filters.contentType}
//                   onChange={(e) => setFilters(prev => ({ ...prev, contentType: e.target.value }))}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 >
//                   <option value="all">All Types</option>
//                   <option value="text">Text</option>
//                   <option value="url">URL</option>
//                   <option value="file">File</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Sort By
//                 </label>
//                 <select
//                   value={filters.sortBy}
//                   onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                   <option value="title">Title A-Z</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Search Results Info */}
//         {searchQuery && (
//           <div className="mt-4 text-sm text-gray-600">
//             {isSearching ? (
//               <div className="flex items-center space-x-2">
//                 <Spinner size="sm" />
//                 <span>Searching...</span>
//               </div>
//             ) : (
//               <span>
//                 Found {pagination.total} result{pagination.total !== 1 ? 's' : ''} for "{searchQuery}"
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Summaries Grid */}
//       {displaySummaries.length === 0 ? (
//         <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
//           <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-xl font-medium text-gray-900 mb-2">
//             {searchQuery ? 'No summaries found' : 'No summaries yet'}
//           </h3>
//           <p className="text-gray-500">
//             {searchQuery 
//               ? 'Try adjusting your search query or filters'
//               : 'Create your first summary to see it here'
//             }
//           </p>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {displaySummaries.map((summary) => (
//               <div
//                 key={summary._id}
//                 className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow"
//               >
//                 <div className="p-6">
//                   {/* Header */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center space-x-2">
//                       {getContentTypeIcon(summary.contentType)}
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLengthBadgeColor(summary.summaryLength)}`}>
//                         {summary.summaryLength}
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-1 text-gray-400">
//                       <Calendar className="w-4 h-4" />
//                       <span className="text-xs">{formatDate(summary.createdAt)}</span>
//                     </div>
//                   </div>

//                   {/* Title */}
//                   <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
//                     {summary.title}
//                   </h3>

//                   {/* Summary Preview */}
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//                     {summary.summary}
//                   </p>

//                   {/* Tags */}
//                   {summary.tags && summary.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-1 mb-4">
//                       {summary.tags.slice(0, 3).map((tag, index) => (
//                         <span
//                           key={index}
//                           className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                       {summary.tags.length > 3 && (
//                         <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
//                           +{summary.tags.length - 3} more
//                         </span>
//                       )}
//                     </div>
//                   )}

//                   {/* Word Count */}
//                   <div className="text-xs text-gray-500 mb-4">
//                     {summary.wordCount?.original || 0} → {summary.wordCount?.summary || 0} words
//                   </div>

//                   {/* Actions */}
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleViewSummary(summary._id)}
//                       className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
//                     >
//                       <Eye className="w-4 h-4" />
//                       <span>View</span>
//                     </button>
//                     <button
//                       onClick={() => handleDeleteSummary(summary._id, summary.title)}
//                       className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {pagination.pages > 1 && (
//             <div className="flex items-center justify-between mt-8">
//               <div className="text-sm text-gray-600">
//                 Showing page {pagination.page} of {pagination.pages} 
//                 ({pagination.total} total summaries)
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => handlePageChange(pagination.page - 1)}
//                   disabled={pagination.page === 1}
//                   className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                   <span>Previous</span>
//                 </button>
                
//                 {/* Page Numbers */}
//                 <div className="flex space-x-1">
//                   {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
//                     const pageNum = i + 1;
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => handlePageChange(pageNum)}
//                         className={`px-3 py-2 rounded-md ${
//                           pagination.page === pageNum
//                             ? 'bg-blue-500 text-white'
//                             : 'border border-gray-300 hover:bg-gray-50'
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                 </div>
                
//                 <button
//                   onClick={() => handlePageChange(pagination.page + 1)}
//                   disabled={pagination.page === pagination.pages}
//                   className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <span>Next</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Summary Detail Modal */}
//       {selectedSummary && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
//             <div className="border-b border-gray-200 p-6 flex items-center justify-between">
//               <h3 className="text-xl font-bold text-gray-900">Summary Details</h3>
//               <button
//                 onClick={() => setSelectedSummary(null)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
            
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="mb-6">
//                 <h4 className="text-lg font-semibold text-gray-800 mb-2">
//                   {selectedSummary.title}
//                 </h4>
//                 <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
//                   <span>Created: {new Date(selectedSummary.createdAt).toLocaleString()}</span>
//                   <span>Length: {selectedSummary.summaryLength}</span>
//                   <span>Type: {selectedSummary.contentType}</span>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h5 className="font-medium text-gray-900 mb-3">Summary</h5>
//                 <div className="prose max-w-none">
//                   <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//                     {selectedSummary.summary}
//                   </p>
//                 </div>
//               </div>

//               {selectedSummary.originalContent && (
//                 <div className="mb-6">
//                   <h5 className="font-medium text-gray-900 mb-3">Original Content</h5>
//                   <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
//                     <p className="text-gray-700 text-sm whitespace-pre-line">
//                       {selectedSummary.originalContent}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {selectedSummary.tags && selectedSummary.tags.length > 0 && (
//                 <div>
//                   <h5 className="font-medium text-gray-900 mb-3">Tags</h5>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedSummary.tags.map((tag, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
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

// export default History;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  Trash2, 
  Eye, 
  Calendar, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X,
  Link,
  Type,
  Clock,
  TrendingUp,
  Archive
} from 'lucide-react';
import { 
  fetchSummaries, 
  searchSummaries, 
  deleteSummary, 
  fetchSummaryById,
  clearSearchResults,
  setSearchQuery
} from './summarySlice.js';
import Spinner from '../../components/Spinner.jsx';
import toast from 'react-hot-toast';

const History = () => {
  const dispatch = useDispatch();
  const { 
    summaries, 
    searchResults, 
    searchQuery, 
    loading, 
    isSearching, 
    pagination,
    currentSummary,
    error 
  } = useSelector(state => state.summary);

  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [filters, setFilters] = useState({
    length: 'all',
    contentType: 'all',
    sortBy: 'newest'
  });

  const displaySummaries = searchQuery ? searchResults : summaries;

  useEffect(() => {
    if (!searchQuery) {
      dispatch(fetchSummaries({ page: 1, limit: 10 }));
    }
  }, [dispatch, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      dispatch(setSearchQuery(localSearchQuery.trim()));
      dispatch(searchSummaries({ 
        query: localSearchQuery.trim(), 
        page: 1, 
        limit: 10 
      }));
    }
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');
    dispatch(clearSearchResults());
  };

  const handleDeleteSummary = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await dispatch(deleteSummary(id)).unwrap();
        toast.success('Summary deleted successfully');
      } catch (error) {
        toast.error('Failed to delete summary');
      }
    }
  };

  const handleViewSummary = async (id) => {
    try {
      const result = await dispatch(fetchSummaryById(id)).unwrap();
      setSelectedSummary(result);
    } catch (error) {
      toast.error('Failed to load summary');
    }
  };

  const handlePageChange = (newPage) => {
    if (searchQuery) {
      dispatch(searchSummaries({ 
        query: searchQuery, 
        page: newPage, 
        limit: pagination.limit 
      }));
    } else {
      dispatch(fetchSummaries({ 
        page: newPage, 
        limit: pagination.limit 
      }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const getLengthBadgeColor = (length) => {
    const colors = {
      short: 'bg-gradient-success text-white',
      medium: 'bg-gradient-primary text-white',
      long: 'bg-gradient-secondary text-white'
    };
    return colors[length] || 'bg-gray-100 text-gray-800';
  };

  const getContentTypeIcon = (type) => {
    const icons = {
      text: Type,
      url: Link,
      file: FileText
    };
    const Icon = icons[type] || FileText;
    return <Icon className="w-4 h-4" />;
  };

  const getContentTypeColor = (type) => {
    const colors = {
      text: 'text-blue-500',
      url: 'text-green-500',
      file: 'text-purple-500'
    };
    return colors[type] || 'text-gray-500';
  };

  if (loading && displaySummaries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center animate-pulse">
          <Archive className="w-8 h-8 text-white" />
        </div>
        <Spinner size="lg" />
        <p className="text-theme-muted">Loading your summaries...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-accent shadow-glow mb-6 animate-float">
          <Archive className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gradient mb-4">Summary History</h2>
        <p className="text-xl text-theme-muted max-w-2xl mx-auto">
          Browse and manage your generated summaries with powerful search and filtering
        </p>
      </div>

      {/* Search and Filters */}
      <div className="glass-card modern-card">
        <div className="p-6 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-theme-muted w-5 h-5" />
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  placeholder="Search summaries by title, content, or tags..."
                  className="input-modern pl-12 pr-12"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-theme-muted hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover-lift ${
                showFilters 
                  ? 'bg-gradient-primary text-white shadow-glow' 
                  : 'border-2 border-theme text-theme-foreground hover:border-blue-300'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="glass p-6 rounded-xl border border-theme animate-slide-in-up">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-theme-foreground mb-3">
                    Length
                  </label>
                  <select
                    value={filters.length}
                    onChange={(e) => setFilters(prev => ({ ...prev, length: e.target.value }))}
                    className="input-modern"
                  >
                    <option value="all">All Lengths</option>
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-theme-foreground mb-3">
                    Content Type
                  </label>
                  <select
                    value={filters.contentType}
                    onChange={(e) => setFilters(prev => ({ ...prev, contentType: e.target.value }))}
                    className="input-modern"
                  >
                    <option value="all">All Types</option>
                    <option value="text">Text</option>
                    <option value="url">URL</option>
                    <option value="file">File</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-theme-foreground mb-3">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="input-modern"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Search Results Info */}
          {searchQuery && (
            <div className="flex items-center justify-between p-4 bg-theme-card rounded-lg border border-theme">
              {isSearching ? (
                <div className="flex items-center space-x-3">
                  <Spinner size="sm" />
                  <span className="text-theme-muted">Searching...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-theme-foreground font-medium">
                    Found {pagination.total} result{pagination.total !== 1 ? 's' : ''} for "{searchQuery}"
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Summaries Display */}
      {displaySummaries.length === 0 ? (
        <div className="glass-card text-center py-16">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-theme-foreground mb-4">
            {searchQuery ? 'No summaries found' : 'No summaries yet'}
          </h3>
          <p className="text-theme-muted text-lg">
            {searchQuery 
              ? 'Try adjusting your search query or filters'
              : 'Create your first summary to see it here'
            }
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {displaySummaries.map((summary, index) => (
              <div
                key={summary._id}
                className="modern-card glass-card hover-lift magnetic-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getContentTypeColor(summary.contentType)} bg-theme-card`}>
                        {getContentTypeIcon(summary.contentType)}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${getLengthBadgeColor(summary.summaryLength)}`}>
                        {summary.summaryLength.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-theme-muted">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{formatDate(summary.createdAt)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-theme-foreground line-clamp-2 hover:text-gradient transition-all duration-300">
                    {summary.title}
                  </h3>

                  {/* Summary Preview */}
                  <div className="p-4 bg-theme-card rounded-lg border border-theme">
                    <p className="text-theme-muted text-sm line-clamp-3 leading-relaxed">
                      {summary.summary}
                    </p>
                  </div>

                  {/* Tags */}
                  {summary.tags && summary.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {summary.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gradient-primary text-white rounded-full text-xs font-medium shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {summary.tags.length > 3 && (
                        <span className="px-2 py-1 bg-theme-card text-theme-muted rounded-full text-xs border border-theme">
                          +{summary.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-theme-muted">
                    <span className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{summary.wordCount?.original || 0} → {summary.wordCount?.summary || 0} words</span>
                    </span>
                    <span className="font-medium">
                      {Math.round(((summary.wordCount?.summary || 0) / (summary.wordCount?.original || 1)) * 100)}% compression
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={() => handleViewSummary(summary._id)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-primary text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleDeleteSummary(summary._id, summary.title)}
                      className="flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg transition-all duration-300 hover:bg-red-600 hover:scale-105 shadow-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="glass-card p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-sm text-theme-muted">
                  <span className="font-medium">
                    Showing page {pagination.page} of {pagination.pages} 
                  </span>
                  <span className="hidden sm:inline">
                    ({pagination.total} total summaries)
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-theme rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300 hover-lift transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="flex space-x-1">
                    {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            pagination.page === pageNum
                              ? 'bg-gradient-primary text-white shadow-glow'
                              : 'border-2 border-theme hover:border-blue-300 text-theme-foreground hover-lift'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-theme rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300 hover-lift transition-all duration-300"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Summary Detail Modal */}
      {selectedSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-hidden animate-bounce-in">
            <div className="border-b border-theme p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-theme-foreground">Summary Details</h3>
                </div>
                <button
                  onClick={() => setSelectedSummary(null)}
                  className="p-2 text-theme-muted hover:text-red-500 rounded-lg hover:bg-theme-card transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-6">
              {/* Summary Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-2xl font-bold text-theme-foreground">
                    {selectedSummary.title}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getLengthBadgeColor(selectedSummary.summaryLength)}`}>
                    {selectedSummary.summaryLength.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-theme-muted">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {new Date(selectedSummary.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getContentTypeIcon(selectedSummary.contentType)}
                    <span>Type: {selectedSummary.contentType}</span>
                  </div>
                </div>
              </div>

              {/* Summary Content */}
              <div>
                <h5 className="font-bold text-theme-foreground mb-4 flex items-center space-x-2">
                  <span>Summary</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </h5>
                <div className="glass p-6 rounded-xl">
                  <p className="text-theme-foreground leading-relaxed text-lg whitespace-pre-line">
                    {selectedSummary.summary}
                  </p>
                </div>
              </div>

              {/* Original Content */}
              {selectedSummary.originalContent && (
                <div>
                  <h5 className="font-bold text-theme-foreground mb-4">Original Content</h5>
                  <div className="bg-theme-card p-6 rounded-xl border border-theme max-h-64 overflow-y-auto">
                    <p className="text-theme-muted text-sm leading-relaxed whitespace-pre-line">
                      {selectedSummary.originalContent}
                    </p>
                  </div>
                </div>
              )}

              {/* Tags */}
              {selectedSummary.tags && selectedSummary.tags.length > 0 && (
                <div>
                  <h5 className="font-bold text-theme-foreground mb-4">Tags</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedSummary.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium shadow-md hover-lift"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 glass rounded-lg">
                  <div className="text-xl font-bold text-gradient">
                    {selectedSummary.wordCount?.original || 0}
                  </div>
                  <div className="text-xs text-theme-muted">Original Words</div>
                </div>
                <div className="text-center p-4 glass rounded-lg">
                  <div className="text-xl font-bold text-gradient-secondary">
                    {selectedSummary.wordCount?.summary || 0}
                  </div>
                  <div className="text-xs text-theme-muted">Summary Words</div>
                </div>
                <div className="text-center p-4 glass rounded-lg">
                  <div className="text-xl font-bold text-gradient-accent">
                    {Math.round(((selectedSummary.wordCount?.summary || 0) / (selectedSummary.wordCount?.original || 1)) * 100)}%
                  </div>
                  <div className="text-xs text-theme-muted">Compression</div>
                </div>
                <div className="text-center p-4 glass rounded-lg">
                  <div className="text-xl font-bold text-gradient-success">
                    {selectedSummary.tags?.length || 0}
                  </div>
                  <div className="text-xs text-theme-muted">Tags</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="glass-card border-red-200 bg-red-50 animate-slide-in-up">
          <div className="p-6 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;