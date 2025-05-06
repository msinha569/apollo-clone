
import connectDb from "@/lib/mongoose";
import DoctorModel from "@/models/Doctor.model";

export async function GET(req) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1
    const limit = 5
    const skip = (page - 1) * limit

    const doctors = await DoctorModel.find({})
      .skip(skip)
      .limit(limit); 

    return new Response(JSON.stringify(doctors), { status: 200 })
  } catch (error) {
    console.error('Error fetching doctors:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch doctors' }),
      { status: 500 }
    );
  }
}
