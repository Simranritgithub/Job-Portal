import {Company} from "../models/Company.model.js";

  
  export const registerCompany = async (req, res) => {
    try {
      console.log("User ID:", req.id); 
      const { companyName, location, logo } = req.body;
  
      if (!companyName) {
        return res.status(400).json({
          message: "Company name is required",
          success: false
        });
      }
  
      let company = await Company.findOne({ name: companyName });
      if (company) {
        return res.status(400).json({
          message: "You can't register the same company again",
          success: false
        });
      }
  
      company = await Company.create({
        name: companyName,
        location: location || "Not Provided",
        logo: logo || "Not Provided",
        userId: req.id 
      });
  
      return res.status(201).json({
        message: "Company registered successfully",
        company,
        success: true
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", success: false });
    }
  };
  
  

export const getCompany = async(req,res) =>{
  try {
    const userId = req.id;
    const companies = await Company.find({userId});
    if(!companies){
      return res.status(404).json({
        message:"Companies not found",
        success:false
      })
    }
    return res.status(200).json({companies,
      success:true
    })
  } catch (error) {
    console.log(error);
  }
}
export const getCompanyById = async (req,res)=>
{
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if(!company){
      return res.status(404).json({
      message:"Companies not found",
      success:false
    })

    }
    return res.status(200).json({
      company,
      success:true
    })

    
  } catch (error) {
    console.log(error);
  }
}
export const updateCompany = async(req, res) => {
  try {
    const { companyName, description, website, location, logo } = req.body;
    const updateData = {
      name: companyName,
      description: description || "",
      website: website || "",
      location: location || "",
      logo: logo || ""
    };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};
