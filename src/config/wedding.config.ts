export interface CouplePerson {
  fullName: string;
  shortName: string;
  marga: string;
  title?: string;
  parents: {
    father: string;
    mother: string;
  };
  instagram?: string;
  photo: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  isoDate: string;
  time: string;
  venueName: string;
  address: string;
  mapsUrl: string;
  note?: string;
}

export interface LoveStoryItem {
  year: string;
  title: string;
  story: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  caption?: string;
}

export interface GiftItem {
  type: 'bank' | 'qris' | 'address';
  provider: string;
  accountNumber: string;
  accountHolder: string;
  note?: string;
}

export interface WeddingConfig {
  meta: {
    themeLabel: string;
  };
  couple: {
    groom: CouplePerson;
    bride: CouplePerson;
  };
  events: WeddingEvent[];
  countdown: {
    targetIsoDate: string;
    expiredLabel: string;
  };
  quote: {
    verse: string;
    translation: string;
    source: string;
  };
  loveStory: LoveStoryItem[];
  gallery: GalleryItem[];
  gifts: GiftItem[];
  audio: {
    src: string;
    title: string;
  };
  hashtag: string;
  greeting: {
    traditional: string;
    opening: string;
  };
  closingMessage: string;
  flags: {
    ambient3d: {
      enabled: boolean;
    };
    heroVideo: {
      enabled: false;
    };
  };
  moments: {
    unlockIsoDate: string;
  };
}

export const weddingConfig: WeddingConfig = {
  meta: {
    themeLabel: '',
  },
  moments: {
    unlockIsoDate: '', // Otomatis terkunci sampai diisi tanggal & jam Hari-H (contoh: '2026-11-20T08:00:00+07:00')
  },
  couple: {
    groom: {
      fullName: 'Ricky Yosua Panjaitan, S.T.',
      shortName: 'Jos',
      marga: 'Panjaitan',
      parents: {
        father: 'Bpk. J. Panjaitan',
        mother: 'Ibu R. Hutahaean (+) / S. Tambunan',
      },
      instagram: 'yostp_',
      photo: '/images/couple/groom.webp',
    },
    bride: {
      fullName: 'Zeni Evita R, A.Md.T.',
      shortName: 'Zeni',
      marga: 'Rumahombar',
      parents: {
        father: 'Bpk. H. Rumahombar',
        mother: 'Ibu R. Sianturi',
      },
      instagram: 'zevitar',
      photo: '/images/couple/bride.webp',
    },
  },
  events: [
    {
      id: 'pemberkatan',
      name: 'Pemberkatan Pernikahan',
      date: 'Sabtu, 28 November 2026',
      isoDate: '2026-11-28T08:00:00+07:00',
      time: '08:00 WIB s/d Selesai',
      venueName: 'Gereja GMI Hermon',
      address: 'Jalan Kampung Pensiunan no. 52 A, Tebing-Tinggi, Kab. Empat Lawang',
      mapsUrl: 'https://maps.app.goo.gl/Vk4yftrybvfxRdSRA',
    },
    {
      id: 'adat',
      name: 'Pesta Adat Batak & Jamuan Makan',
      date: 'Sabtu, 28 November 2026',
      isoDate: '2026-11-28T11:00:00+07:00',
      time: 'Setelah Acara Pemberkatan s/d Selesai',
      venueName: 'Lapangan Futsal Jayaloka (Belakang Koramil)',
      address: 'Lingkungan Jayaloka 1 RT 03 RW 01 Jayaloka, Kec. Tebing-Tinggi, Kab. Empat Lawang',
      mapsUrl: 'https://maps.app.goo.gl/HU8Cm4WgkS247CUU9?g_st=iw',
      note: 'Setelah selesai acara pemberkatan Nikah dari Gereja, kami mengharapkan kehadiran Bapak/Ibu/Saudara/i untuk mengikuti jamuan makan serta mengikuti acara adat.',
    },
  ],
  countdown: {
    targetIsoDate: '2026-11-28T08:00:00+07:00',
    expiredLabel: 'Pemberkatan Kudus Telah Berlangsung',
  },
  quote: {
    verse: 'Matius 19:6',
    translation:
      'Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.',
    source: '',
  },
  loveStory: [
    {
      year: 'Chapter 01',
      title: 'The First Chapter',
      story:
        'Semua berawal dari sebuah kantor. Zeni yang baru sebulan dimutasi ke tempat kerja baru, tak sengaja berpapasan dengan Yosua yang baru saja bergabung sebagai karyawan baru. Saat itu, perkenalan kami sangat singkat—hanya sekadar sapaan sepintas tanpa ada tanda-tanda kalau kami akan jadi babak terpenting dalam hidup masing-masing.',
    },
    {
      year: 'Chapter 02',
      title: 'The Journey',
      story:
        'Waktu pun berjalan, sampai akhirnya sebuah undangan pernikahan teman kantor mempertemukan kami dalam suasana yang lebih santai. Dari obrolan di sana, kami saling follow media sosial, dan plot twist-nya pun dimulai! Siapa sangka, kami ternyata punya lingkaran pertemanan yang sama di Sumatra Selatan.\n\nSemenjak hari itu, obrolan-obrolan kecil di kantor pun makin seru. Ditambah lagi dengan "dukungan penuh" dari teman-teman sekantor yang hobi menjodohkan, percakapan yang tadinya cuma soal pekerjaan perlahan berubah jadi tempat berbagi cerita setiap hari.',
    },
    {
      year: 'Chapter 03',
      title: 'The Next Step',
      story:
        'Seiring berjalannya waktu, ada satu hal ajaib yang kami sadari: daftar kriteria pasangan idaman yang selalu kami panjatkan dalam doa sejak remaja dulu... ternyata terjawab pada diri satu sama lain.\n\nLebih dari itu, kami belajar untuk saling menerima kekurangan masing-masing, dan dari situlah kami mantap untuk melangkah ke jenjang pernikahan. Kami percaya, pernikahan bukan soal menemukan yang sempurna, tapi tentang keinginan untuk terus belajar dan saling mengerti setiap harinya.',
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      src: '/images/gallery/photo-1.webp',
      thumb: '/images/gallery/photo-1-thumb.webp',
      alt: 'Tawa bahagia Jos & Zeni dalam balutan tenun Ulos & Sortali',
      caption: 'Tawa & Sukacita dalam Balutan Tenun Ulos',
    },
    {
      id: 'gal-2',
      src: '/images/gallery/photo-2.webp',
      thumb: '/images/gallery/photo-2-thumb.webp',
      alt: 'Senyum teduh dan tatapan penuh kasih',
      caption: 'Senyum Teduh & Tatapan Kasih',
    },
    {
      id: 'gal-3',
      src: '/images/gallery/photo-3.webp',
      thumb: '/images/gallery/photo-3-thumb.webp',
      alt: 'Bergandengan tangan di tepian danau nan tenang',
      caption: 'Melangkah Bersama Menuju Hari Bahagia',
    },
    {
      id: 'gal-4',
      src: '/images/gallery/photo-4.webp',
      thumb: '/images/gallery/photo-4-thumb.webp',
      alt: 'Siluet hangat berdua berlatar cahaya senja keemasan',
      caption: 'Hangatnya Kasih di Bawah Cahaya Senja',
    },
    {
      id: 'gal-5',
      src: '/images/gallery/photo-5.webp',
      thumb: '/images/gallery/photo-5-thumb.webp',
      alt: 'Kebersamaan ceria Jos & Zeni berlatar alam nan indah',
      caption: 'Pesona Alam Menyaksikan Cinta Kami',
    },
    {
      id: 'gal-6',
      src: '/images/gallery/photo-6.webp',
      thumb: '/images/gallery/photo-6-thumb.webp',
      alt: 'Langkah bahagia menyongsong masa depan dalam balutan busana putih',
      caption: 'Langkah Riang Menyongsong Masa Depan',
    },
    {
      id: 'gal-7',
      src: '/images/gallery/photo-7.webp',
      thumb: '/images/gallery/photo-7-thumb.webp',
      alt: 'Canda dan tawa lepas di pelataran alam terbuka',
      caption: 'Bahagia Sederhana dalam Kebersamaan',
    },
    {
      id: 'gal-8',
      src: '/images/gallery/photo-8.webp',
      thumb: '/images/gallery/photo-8-thumb.webp',
      alt: 'Saling memandang penuh ketulusan dengan buket bunga pernikahan',
      caption: 'Janji Tulus Menjaga Satu Sama Lain',
    },
  ],
  gifts: [
    {
      type: 'bank',
      provider: 'Bank Amar',
      accountNumber: '1523185802',
      accountHolder: 'Zeni Evita R.',
      note: 'Transfer Rekening Mempelai Wanita',
    },
    {
      type: 'bank',
      provider: 'Bank UOB',
      accountNumber: '7413026176',
      accountHolder: 'Ricky Yosua Panjaitan',
      note: 'Transfer Rekening Mempelai Pria',
    },
    {
      type: 'address',
      provider: 'Alamat Pengiriman Kado Fisik',
      accountNumber: '-',
      accountHolder: 'Ricky Yosua Panjaitan & Zeni Evita R.',
      note: 'Informasi alamat pengiriman fisik akan segera diperbarui',
    },
  ],
  audio: {
    src: '/audio/bgm-jacob-lee.m4a',
    title: 'Jacob Lee - I Belong to You',
  },
  hashtag: '#YoZeBegins ❤️',
  greeting: {
    traditional: '',
    opening: 'Salam Damai Sejahtera Dalam Kasih Tuhan Yesus Kristus',
  },
  closingMessage:
    'Merupakan suatu kehormatan dan kebahagiaan yang sangat besar bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kedua mempelai. Kiranya kasih dan damai sejahtera Tuhan Yesus Kristus senantiasa menyertai kita sekalian.',
  flags: {
    ambient3d: {
      enabled: false,
    },
    heroVideo: {
      enabled: false,
    },
  },
};
