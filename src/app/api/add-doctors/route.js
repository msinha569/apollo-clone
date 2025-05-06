import cloudinary from "@/lib/cloudinary"
import { NextResponse } from "next/server"
import connectDb from "@/lib/mongoose"
import DoctorModel from "@/models/Doctor.model"

export async function POST(req) {
  try {
    const body = await req.json()
    const {
      name,
      specialization,
      experience,
      hospital,
      contact,
      email,
      price,
      image: rawImage,
    } = body

    if (!name || !specialization || !experience || !hospital || !contact || !email || !price) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    await connectDb()

    let image =
      `https://ui-avatars.com/api/?name=${name.split(' ')[0]}+${name.split(' ')[1] ?? ''}&background=random`

    if (rawImage) {
      const result = await cloudinary.uploader.upload(rawImage)
      image = result.secure_url
    }

    const newDoctor = new DoctorModel({
      name,
      specialization,
      experience,
      hospital,
      contact,
      email,
      price,
      image,
    })

    await newDoctor.save()

    return NextResponse.json({ message: "Doctor added successfully", doctor: newDoctor }, { status: 201 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to add doctor" }, { status: 500 })
  }
}
