<!-- <template>
  <div class="flex min-h-screen bg-black font-sans">
    <DashboardSidebar />

    <main class="flex-grow p-10 text-white overflow-y-auto">
      <header class="mb-10">
        <h2 class="text-3xl font-black uppercase tracking-tighter text-white ">FIND GYM PARTNERS</h2>
        <p class="text-gray-500 text-sm mt-1">Connect with like-minded fitness enthusiasts</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div class="relative">
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Search by name or goal..." 
            class="w-full bg-[#111111] border border-gray-800 p-3 rounded-xl text-sm focus:ring-1 focus:ring-green-400 outline-none transition"
          >
        </div>
        <select 
          v-model="goalFilter"
          class="bg-[#111111] border border-gray-800 p-3 rounded-xl text-sm text-gray-400 outline-none focus:ring-1 focus:ring-green-400"
        >
          <option value="all">All Goals</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Strength Training">Strength Training</option>
          <option value="Endurance">Endurance</option>
          <option value="HIIT & Cardio">HIIT & Cardio</option>
        </select>
        <select 
          v-model="connectedFilter"
          class="bg-[#111111] border border-gray-800 p-3 rounded-xl text-sm text-gray-400 outline-none focus:ring-1 focus:ring-green-400"
        >
          <option value="all">All Status</option>
          <option value="connected">Connected</option>
          <option value="available">Available</option>
        </select>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="partner in filteredPartners" :key="partner.id" 
             class="bg-[#0f1115] p-6 rounded-[2rem] border border-gray-900 hover:border-green-400/30 transition-all shadow-xl group relative overflow-hidden">
          
          <div class="flex justify-between items-start mb-6">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-green-400 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-green-400/20">
                {{ partner.image }}
              </div>
              <div>
                <h4 class="font-bold text-lg group-hover:text-green-400 transition-colors uppercase  tracking-tight">{{ partner.name }}</h4>
                <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">{{ partner.experience }}</p>
                <div v-if="partner.connected" class="flex items-center gap-1 mt-1">
                  <span class="text-[10px] font-black uppercase text-green-400 bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20">Connected</span>
                </div>
              </div>
            </div>

            <div class="text-right">
              <p class="text-[10px] text-gray-500 uppercase font-black leading-none mb-1">Target Goal</p>
              <p class="text-sm font-black text-white uppercase  tracking-tighter">{{ partner.goal }}</p>
            </div>
          </div>

          <div class="space-y-2 mb-6">
            <p class="text-xs text-gray-400 flex items-center gap-2">
              <span class="text-green-400">📍</span> {{ partner.location }}
            </p>
            <p class="text-xs text-gray-400 flex items-center gap-2">
              <span class="text-green-400">🕒</span> {{ partner.schedule }}
            </p>
          </div>

          <div class="flex gap-2 mb-6">
            <span class="text-[9px] font-black uppercase px-2 py-1 bg-cyan-400/5 border border-cyan-400/20 rounded-md text-cyan-400">
              Focus: {{ partner.goal }}
            </span>
          </div>

        <router-link 
          v-if="partner.connected"
          :to="{ name: 'PartnerDetail', params: { id: partner.id } }" 
          class="w-full block text-center py-3 font-black uppercase text-xs rounded-xl bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10 transition-all">
          View Profile
        </router-link>

        <button 
          v-else
          @click="partner.connected = true"
          class="w-full py-3 font-black uppercase text-xs rounded-xl bg-green-400 text-black hover:bg-green-300 shadow-lg shadow-green-400/10 transition-all active:scale-[0.98]">
           Connect Partner
        </button>
          <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-green-400/5 blur-3xl rounded-full"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DashboardSidebar from '../../components/DashboardSidebar.vue'

// -- Filter States --
const searchTerm = ref("")
const goalFilter = ref("all")
const connectedFilter = ref("all")

// -- Data Partners --
const partners = ref([
  {
    id: 1,
    name: "Alex Johnson",
    image: "AJ",
    goal: "Muscle Gain",
    experience: "Intermediate",
    location: "Downtown Gym",
    schedule: "Mon, Wed, Fri - Morning",
    connected: false,
  },
  {
    id: 2,
    name: "Sarah Chen",
    image: "SC",
    goal: "Weight Loss",
    experience: "Beginner",
    location: "FitZone Studio",
    schedule: "Tue, Thu - Evening",
    connected: false,
  },
  {
    id: 3,
    name: "Michael Brown",
    image: "MB",
    goal: "Strength Training",
    experience: "Advanced",
    location: "PowerHouse Gym",
    schedule: "Mon, Tue, Thu - Morning",
    connected: true,
  },
  {
    id: 4,
    name: "Emma Davis",
    image: "ED",
    goal: "Endurance",
    experience: "Intermediate",
    location: "Zen Fitness",
    schedule: "Wed, Fri, Sat - Afternoon",
    connected: false,
  },
  {
    id: 5,
    name: "Ryan Williams",
    image: "RW",
    goal: "Weight Loss",
    experience: "Beginner",
    location: "Downtown Gym",
    schedule: "Tue, Thu, Sat - Morning",
    connected: true,
  },
  {
    id: 6,
    name: "Olivia Martinez",
    image: "OM",
    goal: "HIIT & Cardio",
    experience: "Intermediate",
    location: "CrossFit Central",
    schedule: "Mon, Wed, Fri - Evening",
    connected: false,
  },
])

// -- Filtering Logic --
const filteredPartners = computed(() => {
  return partners.value.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                          partner.goal.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesGoal = goalFilter.value === "all" || partner.goal === goalFilter.value;
    const matchesConnected =
      connectedFilter.value === "all" ||
      (connectedFilter.value === "connected" && partner.connected) ||
      (connectedFilter.value === "available" && !partner.connected);
    return matchesSearch && matchesGoal && matchesConnected;
  });
});
</script> -->