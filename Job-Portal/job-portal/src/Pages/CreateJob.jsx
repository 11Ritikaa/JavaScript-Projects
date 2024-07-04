/* eslint-disable no-undef */
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import CreatableSelect from "react-select/creatable"

const CreateJob = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const {
        register,
        handleSubmit, reset,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => 
        {
            data.skills = selectedOption;
            // console.log(data);
            fetch("http://localhost:3000/post-job", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(data)
            })
            .then(res => res.json())   
            .then((result) => {
                console.log(result);
                if(result.acknowledged === true){
                    alert("Job Posted Successfully!");
                }
                reset()
            });
        };

      const options = [
        {value: "JavaScript", label: "JavaScript"},
        {value: "C", label: "C"},
        {value: "C++", label: "C++"},
        {value: "HTML", label: "HTML"},
        {value: "CSS", label: "CSS"},
        {value: "React", label: "React"},
        {value: "NodeJS", label: "NodeJS"},
        {value: "MongoDB", label: "MongoDB"},
      ]

      return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Title</label>
                            <input type="text" placeholder="Web Developer"
                             {...register("jobTitle")} className='create-job-input' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Name</label>
                            <input type="text" placeholder='Ex: Microsoft'
                             {...register("companyName")} className='create-job-input' />
                        </div>
                    </div>

                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Minimum Salary</label>
                            <input type="text" placeholder="$20k"
                             {...register("minPrice")} className='create-job-input' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Maximum Salary</label>
                            <input type="text" placeholder="$120k"
                             {...register("maxPrice")} className='create-job-input' />
                        </div>
                    </div>

                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Salary Type</label>
                            <select {...register("salaryType")} className='create-job-input'>
                            <option value="">Choose your Salary</option>
                            <option value="Hourly">Hourly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                        <div className='lg:w-1/2 w-full'> 
                            <label className='block mb-2 text-lg'>Job Location</label>
                            <input type="text" placeholder='Ex: New York'
                             {...register("jobLocation")} className='create-job-input' />
                        </div>
                    </div>

                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Job Posting Date</label>
                            <input type="text" placeholder='dd-mm-yyyy'
                             {...register("postingDate")} className='create-job-input' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Experience Level</label>
                            <select {...register("experienceLevel")} className='create-job-input'>
                            <option value="">Choose your Experience</option>
                            <option value="NoExperience">No Experience</option>
                            <option value="Internship">Internship</option>
                            <option value="Work remotely">Work remotely</option>
                            </select>
                        </div>
                    </div>
                        
                    <div className='block mb-2 text-lg'>
                        <label className='block mb-2 text-lg'>Required Skill Sets</label>
                        <CreatableSelect 
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options} 
                        isMulti
                        className='create-job-input py-4' />
                    </div>

                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Company Logo</label>
                            <input type="url" placeholder="Paste your company logo URL: https://weshare.com/"
                             {...register("companyLogo")} className='create-job-input' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Employment Type</label>
                            <select {...register("employmentType")} className='create-job-input'>
                            <option value="">Choose your Employment Type</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Temporary">Temporary</option>
                            </select>
                        </div>
                    </div>

                    <div className='w-full'>
                        <label className='block mb-2 text-lg placeholder:text-gray-700'>Job Description</label>
                        <textarea {...register("description")} 
                        className='w-full pl-3 py-1.5 focus:outline-none'
                        rows={6}
                        placeholder='Job Description'
                        />
                    </div>

                    <div className='w-full'>
                        <label className='block mb-2 text-lg placeholder:text-gray-700'>Job Posted by</label>
                        <input type="email" placeholder='Ex: name@mail.com'
                             {...register("postedBy")} className='create-job-input' />
                    </div>

                    <input type="submit" className='block mt-12 bg-green text-white font-semibold px-8 py-2 rounded-sm cursor-pointer'/>
                </form>
            </div>
        </div>
  )
}

export default CreateJob
