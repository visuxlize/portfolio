import { MapPin, Car, Clock, List, Info, FileText, ChevronLeft } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-center px-4 py-3">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col items-center">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">STOPS</span>
            </div>
            <div className="flex flex-col items-center">
              <Car className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">VEHICLE</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">TIMING</span>
            </div>
            <div className="flex flex-col items-center">
              <List className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">ORDERS</span>
            </div>
            <div className="flex flex-col items-center">
              <Info className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400 mt-1">INFO</span>
            </div>
            <div className="flex flex-col items-center bg-[#2EFFC5] rounded-lg px-3 py-2">
              <FileText className="w-5 h-5 text-gray-700" />
              <span className="text-xs text-gray-700 mt-1 font-bold">REVIEW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center py-6 bg-white">
        <h1 className="text-2xl font-semibold text-gray-900">Review</h1>
        <p className="text-gray-500 mt-1">Confirm your delivery details</p>
      </div>

      {/* Content */}
      <div className="px-4 space-y-4 pb-32">
        {/* Addresses */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h2 className="font-medium text-gray-900">Addresses</h2>
            </div>
            <span className="text-blue-500 text-sm">Edit</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-black text-white text-xs font-bold rounded">1</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">New Castle Metal</p>
                <p className="text-sm text-gray-500">48-49 33rd St, Lic, NY</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-black text-white text-xs font-bold rounded">2</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">New Castle Metal</p>
                <p className="text-sm text-gray-500">1050 Bristol Rd, Mountainside, NJ</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-600">25.2 miles total</span>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Estimated pickup arrival by</span>
              <span className="font-medium">6:22 PM</span>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Vehicle */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-gray-600" />
              <h2 className="font-medium text-gray-900">Vehicle</h2>
            </div>
            <span className="text-blue-500 text-sm">Edit</span>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">Sprinter Van</h3>
            <p className="text-sm text-gray-500">Pallets, large boxes, appliances</p>
            <p className="text-xs text-gray-400 mt-1">4K LBS MAX</p>
          </div>
        </div>

        {/* Timing */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <h2 className="font-medium text-gray-900">Timing</h2>
            </div>
            <span className="text-blue-500 text-sm">Edit</span>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">Rush Delivery</h3>
            <p className="text-sm text-gray-500">We'll assign a driver to deliver your order right after booking</p>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <List className="w-5 h-5 text-gray-600" />
              <h2 className="font-medium text-gray-900">Orders</h2>
            </div>
            <span className="text-blue-500 text-sm">Edit</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">ORDER SO#1234567</p>
                    <p className="text-sm text-gray-500">ITEM 1:</p>
                  </div>
                  <p className="text-sm text-gray-500">WEIGHT: 1,501 LBS.</p>
                </div>
                <p className="font-medium text-gray-900 mt-1">1x Metal Roofing Material (120" x 48" x 36", 1,501 lbs)</p>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-medium text-gray-900">Delivery requirements</h4>
              <p className="text-sm text-gray-500 mt-1">No requirements specified</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-gray-600" />
              <h2 className="font-medium text-gray-900">Contact Info</h2>
            </div>
            <span className="text-blue-500 text-sm">Edit</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-black text-white text-xs font-bold rounded">1</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">New Castle Metal</p>
                <p className="text-sm text-gray-500">Contact: —</p>
                <p className="text-sm text-gray-500">Notes: —</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-black text-white text-xs font-bold rounded">2</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">1050 Bristol Rd</p>
                <p className="text-sm text-gray-500">Contact: Stewart Chin - 9086547686</p>
                <p className="text-sm text-gray-500">Notes: —</p>
              </div>
            </div>
          </div>
        </div>

        {/* Print Delivery Ticket */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-gray-900">Print Delivery Ticket</h2>
            <a
              href="/api/delivery-ticket/download"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Download
            </a>
          </div>
        </div>

        {/* Accessories */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-600" />
            <h2 className="font-medium text-gray-900">Accessories</h2>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">TOLL FEE:</span>
            <span className="font-medium">+$22.61</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        {/* Total */}
        <div className="bg-black text-white px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">TOTAL</span>
            <span className="text-2xl font-bold">$194.94</span>
          </div>
        </div>
        
        {/* Bottom Controls */}
        <div className="flex items-center px-4 py-3">
          <ChevronLeft className="w-5 h-5 text-gray-400 mr-4" />
          
          <div className="flex-1 grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 uppercase">Distance</p>
              <p className="font-medium">25 mi</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Vehicle</p>
              <p className="font-medium">Sprinter Van</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Timing</p>
              <p className="font-medium">Rush</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Total</p>
              <p className="font-medium">$194.94</p>
            </div>
          </div>
          
          <button className="bg-[#2EFFC5] text-black px-6 py-2 rounded-lg font-medium ml-4">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
