import Activity from "../models/activityModel.js";

export const createActivity = async (req, res) => {
    try {
        const { title, description, location, date, time } = req.body;
        const newActivity = new Activity({
            title,
            description,
            location,
            date,
            time
        });
        await newActivity.save();
        res.status(201).json({ message: "Activity created successfully", activity: newActivity });
    } catch (error) {
        res.status(500).json({ message: "Error creating activity" });
        console.log(error.message);  
    }
}

export const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json({ activities });
    } catch (error) {
        res.status(500).json({ message: "Error fetching activities" });
        console.log(error.message);    
    }
}