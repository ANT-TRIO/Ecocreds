export default function Home() {
  const features = [
    {
      title: "Sustainable Buying",
      description: "Make eco-friendly purchases and reduce your carbon footprint with our verified green products",
      icon: "🌱"
    },
    {
      title: "Carbon Reduction",
      description: "Track and reduce your carbon emissions with every sustainable purchase you make",
      icon: "📊"
    },
    {
      title: "Product Alternatives",
      description: "Discover eco-friendly alternatives to everyday products that are better for the planet",
      icon: "🔄"
    },
    {
      title: "EcoPoints Rewards",
      description: "Earn Ecopoints on sustainable buys that can be used to get discounts and special offers",
      icon: "🏆"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-green-600">🌿 EcoCred</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="/login" className="text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </a>
              <a href="/signup" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition duration-300">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Shop Smart.
            <span className="text-green-600 block">Save the Planet.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join EcoCred and transform your shopping habits. Earn rewards for sustainable choices, 
            reduce your carbon footprint, and discover eco-friendly alternatives.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/signup" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg">
              Get Started
            </a>
            <a href="#features" className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-300">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How EcoCred Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform helps you make sustainable choices while rewarding you for your eco-friendly efforts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 border border-green-100">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Green Journey
            </h2>
            <p className="text-green-100 text-lg">
              Simple steps to make a big impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold">Sign Up & Shop</h3>
              <p className="text-green-100">Create your account and start shopping for verified sustainable products</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold">Earn EcoPoints</h3>
              <p className="text-green-100">Get rewarded with EcoPoints for every sustainable purchase you make</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold">Redeem & Save</h3>
              <p className="text-green-100">Use your EcoPoints to get discounts and support more eco-friendly brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-green-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            Join thousands of eco-conscious shoppers making a difference with every purchase.
          </p>
          <p className="text-green-600 font-semibold mt-2">
            Together, we can build a sustainable future.
          </p>
        </div>
      </footer>
    </div>
  );
}