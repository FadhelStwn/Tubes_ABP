<template>
  <div class="flex min-h-screen bg-black">
    <DashboardSidebar />

    <main class="flex-grow p-10 text-white overflow-y-auto">
      <header class="mb-10">
        <h2 class="text-3xl font-black uppercase tracking-tighter text-white">Find Trainers</h2>
        <p class="text-gray-500 text-sm mt-1">Discover expert trainers tailored to your fitness goals.</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div class="relative">
          <input type="text" placeholder="Search by name or specialization..." 
                 class="w-full bg-[#111111] border border-gray-800 p-3 rounded-xl text-sm focus:ring-1 focus:ring-green-400 outline-none transition">
        </div>
        <select class="bg-[#111111] border border-gray-800 p-3 rounded-xl text-sm text-gray-400 outline-none focus:ring-1 focus:ring-green-400">
          <option>All Specializations</option>
          <option>Strength & Conditioning</option>
          <option>Yoga & Flexibility</option>
          <option>HIIT & Cardio</option>
        </select>
        <select class="bg-[#111111] border border-gray-800 p-3 rounded-xl text-sm text-gray-400 outline-none focus:ring-1 focus:ring-green-400">
          <option>All Prices</option>
          <option>$20 - $50</option>
          <option>$50 - $100</option>
        </select>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="trainer in trainers" :key="trainer.id" 
             class="bg-[#0f1115] p-6 rounded-[2rem] border border-gray-900 hover:border-green-400/30 transition-all shadow-xl group">
          <div class="flex justify-between items-start mb-6">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-green-400 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-green-400/20">
                <img :src="trainer.image" alt="Trainer" class="w-full h-full object-cover" />
              </div>
              <div>
                <h4 class="font-bold text-lg group-hover:text-green-400 transition-colors">{{ trainer.name }}</h4>
                <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">{{ trainer.specialty }}</p>
                <div class="flex items-center gap-1 mt-1">
                  <span class="text-yellow-500">⭐</span>
                  <span class="text-xs font-bold">{{ trainer.rating }}</span>
                  <span class="text-xs text-gray-600">({{ trainer.reviews }} reviews)</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-black text-green-400">${{ trainer.price }}</p>
              <p class="text-[10px] text-gray-500 uppercase font-bold">per session</p>
            </div>
          </div>

          <div class="space-y-2 mb-6">
            <p class="text-xs text-gray-400 flex items-center gap-2">📍 {{ trainer.location }}</p>
            <p class="text-xs text-gray-400 flex items-center gap-2">🕒 Available: {{ trainer.availability }}</p>
          </div>

          <div class="flex gap-2 mb-6">
            <span v-for="tag in trainer.tags" :key="tag" 
                  class="text-[9px] font-bold uppercase px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-400">
              {{ tag }}
            </span>
          </div>

          <button class="w-full py-3 bg-green-400 text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-green-300 transition-all active:scale-[0.98]">
            Book Session
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import DashboardSidebar from '../../components/DashboardSidebar.vue'

const trainers = [
  {
    id: 1,
    name: 'Amba Tron',
    image:'https://i.pinimg.com/736x/18/a1/86/18a186799d44b8999e5750df84643749.jpg',
    specialty: 'Strength & Conditioning',
    rating: 4.9,
    reviews: 127,
    price: 50,
    location: 'Downtown Gym',
    availability: 'Mon, Wed, Fri',
    tags: ['Muscle Lift', 'Diet']
  },
  {
    id: 2,
    name: 'Imoet Sasimok',
    image:'https://i.pinimg.com/736x/01/6a/5a/016a5a184a4f6403db70327392b4c5bb.jpg',
    specialty: 'HIIT & Cardio',
    rating: 4.8,
    reviews: 94,
    price: 45,
    location: 'Victoria Studio',
    availability: 'Tue, Thu, Sat',
    tags: ['Fat Loss', 'Agility']
  },
  {
    id: 3,
    name: 'Fuad Sparta',
    image:'https://i.pinimg.com/736x/3b/59/66/3b5966e89d0d503fc478a4d0553c0e42.jpg',
    specialty: 'Weight Loss',
    rating: 4.7,
    reviews: 84,
    price: 40,
    location: 'Power House Gym',
    availability: 'Mon - Fri',
    tags: ['Cardio', 'Transformation']
  },
  {
    id: 4,
    name: 'Mas Ironi',
    image:'https://i.pinimg.com/736x/6b/0b/3b/6b0b3b273446db32253cc0b259ffe4aa.jpg',
    specialty: 'Yoga & Flexibility',
    rating: 4.9,
    reviews: 156,
    price: 55,
    location: 'Zen Space',
    availability: 'Mon, Wed, Sat',
    tags: ['Meditation', 'Balance']
  },
  {
    id: 5,
    name: 'Rusdi Icikiwir',
    image:'https://i.pinimg.com/736x/57/9a/a4/579aa4eccb2080c5cdc9939b39ce03a2.jpg',
    specialty: 'Yoga & Flexibility',
    rating: 4.9,
    reviews: 156,
    price: 55,
    location: 'Zen Space',
    availability: 'Mon, Wed, Sat',
    tags: ['Meditation', 'Balance']
  },
  {
    id: 6,
    name: 'Riko Racing',
    image:'https://images.unsplash.com/photo-1599058917212-d750089bc07e',
    specialty: 'Yoga & Flexibility',
    rating: 4.9,
    reviews: 156,
    price: 55,
    location: 'Zen Space',
    availability: 'Mon, Wed, Sat',
    tags: ['Meditation', 'Balance']
  }
  ]
</script>