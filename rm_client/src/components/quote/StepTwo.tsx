import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFormContext } from "react-hook-form";
import styles from "../../styles/component/quote.module.scss";
import EquipmentIcon from "../Icon/EquipmentIcon";
import MaterialIcon from "../Icon/MaterialIcon";
import PackingIcon from "../Icon/PackingIcon";
import ReassemblyIcon from "../Icon/ReliabilityIcon";
import Residential from "../Icon/Residential";
import StorageIcon from "../Icon/StorageIcon";
import RadioButton from "../RadioButton";

const interestedOptions = [
  { value: "storage", label: "Storage", Icon: <Residential Color="#484848" /> },
  {
    value: "service",
    label: "Packing Service",
    Icon: <Residential Color="#484848" />,
  },
  {
    value: "material",
    label: "Boxes & Packing Material",
    Icon: <Residential Color="#484848" />,
  },
  {
    value: "reassembly",
    label: "Dismantling and Reassembly",
    Icon: <Residential Color="#484848" />,
  },
  {
    value: "equipment",
    label: "Medical Specific Equipment",
    Icon: <Residential Color="#484848" />,
  },
];

const StepTwo = () => {
  const [selected, setSelected] = useState<string>("biking");
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>First Name *</label>
            <input {...register("fname")} className="border p-2 w-full" />
            {errors.fname && (
              <p className="text-red-500">{errors.fname.message}</p>
            )}
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>Last Name *</label>
            <input {...register("lname")} className="border p-2 w-full" />
            {errors.lname && (
              <p className="text-red-500">{errors.lname.message}</p>
            )}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>Email:</label>
            <input
              type="email"
              {...register("email")}
              className="border p-2 w-full"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>Phone Number:</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number (must be 10 digits)",
                },
              })}
              className="border p-2 w-full"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>
              Moving Date
              <span>When are you moving? *</span>
            </label>
            <Controller
              control={control}
              name="movingDate"
              rules={{ required: "Moving date is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="border p-2 w-full"
                />
              )}
            />
            {errors.movingDate && (
              <p className="text-red-500">{errors.movingDate.message}</p>
            )}
          </div>
        </div>

        {/* Also interested in? */}
        <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 col-lg-12">
          <div className={styles.inputItem}>
            <label>Also interested in?</label>
            <Controller
              name="interested"
              control={control}
              render={({ field }) => (
                <div className={styles.customRadioWrap}>
                  <RadioButton
                    name={field.name}
                    value="storage"
                    label="Storage"
                    icon={<StorageIcon Color="#484848" />}
                    checked={field.value === "storage"}
                    onChange={field.onChange}
                  />

                  <RadioButton
                    name={field.name}
                    value="packing"
                    label="Packing Service"
                    icon={<PackingIcon Color="#484848" />}
                    checked={field.value === "packing"}
                    onChange={field.onChange}
                  />

                  <RadioButton
                    name={field.name}
                    value="material"
                    label="Boxes & Packing Material"
                    icon={<MaterialIcon Color="#484848" />}
                    checked={field.value === "material"}
                    onChange={field.onChange}
                  />
                  <RadioButton
                    name={field.name}
                    value="reassembly"
                    label="Dismantling and Reassembly"
                    icon={<ReassemblyIcon Color="#484848" />}
                    checked={field.value === "reassembly"}
                    onChange={field.onChange}
                  />
                  <RadioButton
                    name={field.name}
                    value="equipment"
                    label="Medical Specific Equipment"
                    icon={<EquipmentIcon Color="#484848" />}
                    checked={field.value === "equipment"}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
