import { useState, useEffect } from "react";
import { GetCountries, GetState } from "react-country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { registrationAction } from "../../store/index";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    countries,
    states,
    fname,
    lname,
    email,
    country,
    state,
    phone,
    password,
    confirmPassword,
  } = useSelector((state) => state);

  const formatCountryLabel = ({ label, iso2 }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <img
        src={`https://flagcdn.com/w20/${iso2.toLowerCase()}.png`}
        alt={label}
        style={{ width: 20, height: 15, objectFit: "cover" }}
      />
      <span>{label}</span>
    </div>
  );

  const customStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: "#1F2937",
      color: "white",
      borderColor: isFocused ? "#3B82F6" : "#4B5563",
      borderRadius: "0.5rem",
      padding: "2px 6px",
      boxShadow: isFocused ? "0 0 0 1px #3B82F6" : "none",
      minHeight: "42px",
    }),
    input: (styles) => ({
      ...styles,
      color: "white",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: 8,
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused ? "#2563EB" : "#1F2937",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#9CA3AF",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#1F2937",
      borderRadius: "0.5rem",
      overflow: "hidden",
    }),
    menuList: (styles) => ({
      ...styles,
      paddingTop: 0,
      paddingBottom: 0,
    }),
  };

  useEffect(() => {
    GetCountries().then((result) => {
      const formatted = result.map((c) => ({
        value: c.id,
        label: c.name,
        iso2: c.iso2,
      }));
      dispatch(registrationAction.setCountries(formatted));
    });
  }, []);

  useEffect(() => {
    if (country?.value) {
      GetState(country.value).then((result) => {
        const formattedStates = result.map((s) => ({
          value: s.id,
          label: s.name,
        }));
        dispatch(registrationAction.setState(formattedStates));
      });
    }
  }, [country]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      alert("Passwords do not match");
      return;
    }
    navigate("/success");
  };

  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-2xl p-8 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 relative">

        {/* Back button */}
        <div className="absolute top-4 left-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline dark:text-blue-400 text-sm"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h5 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
            Create an Account
          </h5>

          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-white">First Name</label>
              <input
                type="text"
                value={fname}
                onChange={(e) =>
                  dispatch(registrationAction.saveData({ fname: e.target.value, type: "fname" }))
                }
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Last Name</label>
              <input
                type="text"
                value={lname}
                onChange={(e) =>
                  dispatch(registrationAction.saveData({ lname: e.target.value, type: "lname" }))
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) =>
                  dispatch(registrationAction.saveData({ email: e.target.value, type: "email" }))
                }
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  dispatch(registrationAction.saveData({ phone: e.target.value, type: "phone" }))
                }
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Country and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Country</label>
              <Select
                options={countries}
                value={country}
                onChange={(label) =>
                  dispatch(registrationAction.saveData({ country: label, type: "country" }))
                }
                formatOptionLabel={formatCountryLabel}
                styles={customStyles}
                placeholder="Choose a country"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">State</label>
              <Select
                options={states}
                value={state}
                onChange={(label) =>
                  dispatch(registrationAction.saveData({ state: label, type: "state" }))
                }
                styles={customStyles}
                placeholder={country ? "Choose a state" : "Select a country first"}
                isDisabled={!country}
              />
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) =>
                  dispatch(registrationAction.saveData({ password: e.target.value, type: "password" }))
                }
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  dispatch(registrationAction.saveData({
                    confirmPassword: e.target.value,
                    type: "confirmPassword",
                  }))
                }
                className={inputClass}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
