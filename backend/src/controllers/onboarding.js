import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";

export async function onboarding(req, res) {
  const userId = req.user._id;
  const {
    firstName,
    lastName,
    bio,
    nativeLanguage,
    learningLanguage,
    location,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !bio ||
    !nativeLanguage ||
    !learningLanguage ||
    !location
  ) {
    return res.status(400).json({
      message: "All fields are required",
      missingFields: [
        !firstName && "firstName",
        !lastName && "lastName",
        !bio && "bio",
        !nativeLanguage && "nativeLanguage",
        !learningLanguage && "learningLanguage",
        !location && "location",
      ].filter(Boolean),
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      ...req.body,
      isOnboarded: true,
    },
    { new: true }
  );

  if (!updatedUser) return res.status(404).json({ message: "User not found" });

  try {
    await upsertStreamUser({
      id: updatedUser._id.toString(),
      name: `${updatedUser.firstName} ${updatedUser.lastName}`,
      image: updatedUser.profilePic || "",
    });
    console.log(
      `Stream user updated after onboarding for ${updatedUser.firstName} ${updatedUser.lastName}`
    );

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
