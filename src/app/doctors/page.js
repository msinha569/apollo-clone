import DoctorsClientPageWrapper from './DoctorsClientPageWrapper'

export const metadata = {
  title: "Consult General Physicians Online - Internal Medicine | YourApp",
  description: "Find and consult with top general physicians and internal medicine specialists online.",
  openGraph: {
    title: "Consult General Physicians Online",
    description: "Online consultations with top internal medicine doctors.",
    url: "https://yourdomain.com/specialties/general-physician-internal-medicine",
    images: [
      {
        url: "https://yourdomain.com/images/og-doctors.png",
        width: 800,
        height: 600,
        alt: "Doctor Listing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Consult General Physicians",
    description: "Online consultations with top doctors.",
    images: ["https://yourdomain.com/images/twitter-doctors.png"],
  },
}

export default function DoctorsPage() {
  return <DoctorsClientPageWrapper />
}
