<template>
  <main class="flex-grow p-8 text-white overflow-y-auto bg-[#0a0b10]">
    <header class="mb-8">
      <h2 class="text-3xl font-black uppercase tracking-tighter italic text-white">Profile</h2>
      <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Manage your professional information</p>
    </header>

    <div class="space-y-6">
      <section class="bg-[#161920] p-8 rounded-2xl border border-gray-900">
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Profile Photo</h3>
        <div class="flex items-center gap-6">
          <div class="w-24 h-24 bg-green-400 rounded-2xl flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-green-400/10 italic">
            DM
          </div>
          <div class="space-y-3">
            <button class="bg-green-400/10 text-green-400 border border-green-400/20 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-green-400/20 transition-all">
              <span>📷</span> Upload Photo
            </button>
            <p class="text-[8px] text-gray-600 font-bold uppercase tracking-tight">.JPG, .PNG or .GIF. Max size 2MB.</p>
          </div>
        </div>
      </section>

      <section class="bg-[#161920] p-8 rounded-2xl border border-gray-900">
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Personal Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1">Full Name</label>
            <input type="text" v-model="profile.name" class="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-xs text-gray-300 focus:border-green-400 outline-none transition-all">
          </div>
          <div class="space-y-2">
            <label class="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1">Email</label>
            <input type="email" v-model="profile.email" class="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-xs text-gray-300 focus:border-green-400 outline-none transition-all">
          </div>
          <div class="space-y-2">
            <label class="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1">Phone Number</label>
            <input type="text" v-model="profile.phone" class="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-xs text-gray-300 focus:border-green-400 outline-none transition-all">
          </div>
          <div class="space-y-2">
            <label class="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1">Specialization</label>
            <select v-model="profile.specialization" class="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-xs text-gray-300 focus:border-green-400 outline-none transition-all appearance-none">
              <option>Strength & Conditioning</option>
              <option>Weight Loss</option>
              <option>HIIT Training</option>
            </select>
          </div>
        </div>
      </section>

      <section class="bg-[#161920] p-8 rounded-2xl border border-gray-900">
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Professional Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="space-y-2">
            <label class="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1">Years of Experience</label>
            <input type="number" v-model="profile.experience" class="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-xs text-gray-300 focus:border-green-400 outline-none transition-all">
          </div>
          <div class="space-y-2">
            <label class="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1">Certifications</label>
            <input type="text" v-model="profile.certifications" class="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-xs text-gray-300 focus:border-green-400 outline-none transition-all">
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1">Bio</label>
          <textarea v-model="profile.bio" rows="4" class="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-xs text-gray-300 focus:border-green-400 outline-none transition-all resize-none"></textarea>
        </div>
      </section>

      <div class="flex justify-end gap-4 pt-4">
        <button class="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">Cancel</button>
        <button class="bg-green-400 text-black px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-300 transition-all shadow-lg shadow-green-400/20">Save Changes</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const profile = ref({
  name: 'David Martinez',
  email: 'david@example.com',
  phone: '+1 (555) 123-4567',
  specialization: 'Strength & Conditioning',
  experience: 8,
  certifications: 'NASM-CPT, CSCS',
  bio: 'Passionate fitness trainer with 8 years of experience helping clients achieve their strength and conditioning goals. Specialized in athletic performance and functional training.'
})
</script>