import React from 'react';
import { widgets } from '@/utils/data';

const WidgetPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto my-12">
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        {widgets.map((widget, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center flex-1 min-w-0"
          >
            <div className="bg-gray-500 p-4 rounded-lg mb-4 transition-all duration-300 hover:bg-gray-600">
              <widget.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">{widget.title}</h3>
            <p className="text-gray-600 text-sm">{widget.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetPanel;