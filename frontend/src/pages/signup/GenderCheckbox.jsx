const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	console.log(selectedGender)
	return (
		<div className='flex'>
			<div className='form-control'>
				 {/* selected here is Tailwind class */}
				<label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
					<span className='label-text'>Male</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						//the checked attribute here is a boolean value
						// with his checked attribute only the true checked input will be ticked
						checked={selectedGender === "male"}
						// this onCheckboxChange is accepting prop or argument in signup page which is "gender"

						//as you click on this input this onChange will run and return male
						onChange={() => onCheckboxChange("male")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`}>
					<span className='label-text'>Female</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedGender === "female"}
						//if you click on this onChange this will run and return female
						onChange={() => onCheckboxChange("female")}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;