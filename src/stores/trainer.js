import { defineStore } from 'pinia'

export const useTrainerStore = defineStore('trainer', {
  state: () => ({
    trainers: [
      {
        id: 1,
        name: "Amba Tron",
        role: "Strength Coach",
        experience: "5 Tahun pengalaman di bidang strength training",
        address: "Jakarta, Indonesia",
        email: "amba@gymbuddy.com",
        phone: "08123456789",
        totalClients: 73,
        img: "https://i.pinimg.com/736x/18/a1/86/18a186799d44b8999e5750df84643749.jpg"
      },
      {
        id: 2,
        name: "Imoet Sasimok",
        role: "Fat Loss Expert",
        experience: "Spesialis fat loss & body transformation",
        address: "Bandung, Indonesia",
        email: "imoet@gymbuddy.com",
        phone: "08234567891",
        totalClients: 120,
        img: "https://i.pinimg.com/736x/01/6a/5a/016a5a184a4f6403db70327392b4c5bb.jpg"
      },
      {
        id: 3,
        name: "Fuad Sparta",
        role: "Yoga Specialist",
        experience: "Ahli yoga & fleksibilitas",
        address: "Surabaya, Indonesia",
        email: "fuad@gymbuddy.com",
        phone: "08129876543",
        totalClients: 50,
        img: "https://i.pinimg.com/736x/3b/59/66/3b5966e89d0d503fc478a4d0553c0e42.jpg"
      },
      {
        id: 4,
        name: "Mas Ironi",
        role: "Personal Trainer",
        experience: "Trainer profesional untuk semua level",
        address: "Jakarta, Indonesia",
        email: "ironi@gymbuddy.com",
        phone: "08121212121",
        totalClients: 90,
        img: "https://i.pinimg.com/736x/6b/0b/3b/6b0b3b273446db32253cc0b259ffe4aa.jpg"
      },
      {
        id: 5,
        name: "Rusdi Icikiwir",
        role: "Bodybuilding Coach",
        experience: "Spesialis bodybuilding & muscle gain",
        address: "Medan, Indonesia",
        email: "rusdi@gymbuddy.com",
        phone: "082211223344",
        totalClients: 110,
        img: "https://i.pinimg.com/736x/57/9a/a4/579aa4eccb2080c5cdc9939b39ce03a2.jpg"
      },
      {
        id: 6,
        name: "Riko Racing",
        role: "Pilates Instructor",
        experience: "Instruktur pilates & core training",
        address: "Bali, Indonesia",
        email: "riko@gymbuddy.com",
        phone: "081333444555",
        totalClients: 60,
        img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e"
      }
    ]
  }),

  getters: {
    getTrainerById: (state) => {
      return (id) => state.trainers.find(t => t.id == id)
    }
  }
})