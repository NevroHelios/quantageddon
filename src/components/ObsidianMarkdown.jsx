import React from 'react';
import ReactMarkdown from 'react-markdown';

const ObsidianMarkdown = ({ content }) => {
  return (
    <div className="w-full bg-slate-900">
      <ReactMarkdown
        components={{
          // Clean, minimal headings
          h1: ({ node, ...props }) => (
            <h1 
              {...props} 
              className="text-3xl font-semibold mb-6 mt-8 text-blue-300 border-b border-blue-500/20 pb-2" 
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 
              {...props} 
              className="text-2xl font-semibold mb-4 mt-6 text-blue-200" 
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 
              {...props} 
              className="text-xl font-medium mb-3 mt-5 text-blue-100" 
            />
          ),
          
          // Simplified text elements
          p: ({ node, ...props }) => (
            <p 
              {...props} 
              className="mb-4 leading-relaxed text-slate-300" 
            />
          ),
          strong: ({ node, ...props }) => (
            <strong 
              {...props} 
              className="font-semibold text-blue-200" 
            />
          ),
          em: ({ node, ...props }) => (
            <em 
              {...props} 
              className="italic text-slate-200" 
            />
          ),
          
          // Clean lists
          ul: ({ node, ...props }) => (
            <ul 
              {...props} 
              className="mb-4 pl-6 list-disc space-y-2 text-slate-300" 
            />
          ),
          ol: ({ node, ...props }) => (
            <ol 
              {...props} 
              className="mb-4 pl-6 list-decimal space-y-2 text-slate-300" 
            />
          ),
          
          // Subtle links
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          
          // Minimal code blocks
          code: ({ node, inline, ...props }) => (
            inline ? (
              <code
                {...props}
                className="bg-slate-800 text-blue-200 px-1.5 py-0.5 rounded font-mono text-sm"
              />
            ) : (
              <code
                {...props}
                className="block bg-slate-800 text-slate-200 p-4 rounded-lg font-mono text-sm overflow-x-auto"
              />
            )
          ),
          pre: ({ node, ...props }) => (
            <pre
              {...props}
              className="mb-4 rounded-lg overflow-hidden bg-slate-800"
            />
          ),
          
          // Clean blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-2 border-blue-400/30 pl-4 my-4 italic text-slate-300 bg-slate-800/50 py-2 pr-4 rounded-r"
            />
          ),
          
          // Subtle horizontal rules
          hr: ({ node, ...props }) => (
            <hr 
              {...props} 
              className="my-8 border-slate-700" 
            />
          ),
          
          // Clean tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table {...props} className="w-full border-collapse table-auto" />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead {...props} className="bg-slate-800" />
          ),
          th: ({ node, ...props }) => (
            <th 
              {...props} 
              className="border border-slate-700 px-4 py-2 text-left text-blue-200" 
            />
          ),
          td: ({ node, ...props }) => (
            <td 
              {...props} 
              className="border border-slate-700 px-4 py-2 text-slate-300" 
            />
          ),
          
          // Simple images
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="max-w-full h-auto rounded-lg my-4 border border-slate-700"
              loading="lazy"
            />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
export default ObsidianMarkdown;