import Account from "../models/account.model";


export const createAccount = async (req: any, res: any) => {
  try {
    const userId = req.user._id; 
    const newAccount = new Account({
      user: userId,
      status: "active",
      currency: "INR",
    });

    await newAccount.save();
    res.status(201).json({ message: "Account created successfully", account: newAccount });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Server error while creating account" });
  }
};