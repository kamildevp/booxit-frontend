import { z } from 'zod'

export const categories = [
  {
    text: 'schemas.services.category.entry.Hairdresser',
    value: 'Hairdresser',
    icon: 'icon-park-outline:hair-brush',
  },
  {
    text: 'schemas.services.category.entry.Barber',
    value: 'Barber',
    icon: 'icon-park-outline:english-mustache',
  },
  {
    text: 'schemas.services.category.entry.Skin_Care_&_Spa',
    value: 'Skin Care & Spa',
    icon: 'icon-park-outline:lotus',
  },
  {
    text: 'schemas.services.category.entry.Nails',
    value: 'Nails',
    icon: 'icon-park-outline:fingernail',
  },
  {
    text: 'schemas.services.category.entry.Brows_&_Lashes',
    value: 'Brows & Lashes',
    icon: 'icon-park-outline:eyebrow',
  },
  {
    text: 'schemas.services.category.entry.Cosmetic_Treatments',
    value: 'Cosmetic Treatments',
    icon: 'icon-park-outline:cosmetic-brush',
  },
  {
    text: 'schemas.services.category.entry.Wellness',
    value: 'Wellness',
    icon: 'icon-park-outline:sleaves',
  },
  {
    text: 'schemas.services.category.entry.Healthcare',
    value: 'Healthcare',
    icon: 'icon-park-outline:medicine-chest',
  },
  {
    text: 'schemas.services.category.entry.Fitness_&_Sports',
    value: 'Fitness & Sports',
    icon: 'icon-park-outline:fitness',
  },
  {
    text: 'schemas.services.category.entry.Sports_Facilities_Rental',
    value: 'Sports Facilities Rental',
    icon: 'icon-park-outline:golf-course',
  },
  {
    text: 'schemas.services.category.entry.Accommodation',
    value: 'Accommodation',
    icon: 'icon-park-outline:hotel',
  },
  {
    text: 'schemas.services.category.entry.Rentals',
    value: 'Rentals',
    icon: 'icon-park-outline:car',
  },
  {
    text: 'schemas.services.category.entry.Travel',
    value: 'Travel',
    icon: 'icon-park-outline:coconut-tree',
  },
  {
    text: 'schemas.services.category.entry.Restaurants',
    value: 'Restaurants',
    icon: 'icon-park-outline:chef-hat-one',
  },
  {
    text: 'schemas.services.category.entry.Catering',
    value: 'Catering',
    icon: 'icon-park-outline:fork-spoon',
  },
  {
    text: 'schemas.services.category.entry.Cleaning',
    value: 'Cleaning',
    icon: 'icon-park-outline:vacuum-cleaner',
  },
  {
    text: 'schemas.services.category.entry.Home_Maintenance',
    value: 'Home Maintenance',
    icon: 'icon-park-outline:home',
  },
  {
    text: 'schemas.services.category.entry.Facilities_Rental',
    value: 'Facilities Rental',
    icon: 'icon-park-outline:building-four',
  },
  {
    text: 'schemas.services.category.entry.Education',
    value: 'Education',
    icon: 'icon-park-outline:bachelor-cap',
  },
  {
    text: 'schemas.services.category.entry.Automotive',
    value: 'Automotive',
    icon: 'icon-park-outline:tool',
  },
  {
    text: 'schemas.services.category.entry.Finance',
    value: 'Finance',
    icon: 'icon-park-outline:wallet',
  },
  {
    text: 'schemas.services.category.entry.Legal',
    value: 'Legal',
    icon: 'icon-park-outline:gavel',
  },
  {
    text: 'schemas.services.category.entry.Business',
    value: 'Business',
    icon: 'icon-park-outline:briefcase',
  },
  {
    text: 'schemas.services.category.entry.Pet_Care',
    value: 'Pet Care',
    icon: 'icon-park-outline:cat',
  },
  {
    text: 'schemas.services.category.entry.Tech_support',
    value: 'Tech support',
    icon: 'icon-park-outline:monitor-one',
  },
  {
    text: 'schemas.services.category.entry.Other',
    value: 'Other',
    icon: 'icon-park-outline:other',
  },
]

export const values = categories.map(entry => entry.value)

export default z.enum(values)
