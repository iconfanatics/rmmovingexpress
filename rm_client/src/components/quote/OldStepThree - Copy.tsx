import { useFormContext } from "react-hook-form";

const propertyOptions = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "storage", label: "Storage" },
];
const internalOptions = [
  { value: "single", label: "Single storey" },
  { value: "double", label: "Double storey" },
  { value: "triple", label: "Triple storey" },
];
const truckOptions = [
  { value: "driveway", label: "Driveway parking" },
  { value: "street", label: "Street parking" },
  { value: "rear", label: "Rear or Laneway parking" },
  { value: "complicated", label: "More complicated" },
];

const StepThree = () => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="container">
      <div className="row">
        {/* <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>Type of property</label>
            <Controller
              control={control}
              name="property"
              defaultValue=""
              rules={{ required: "Type of property is required" }}
              render={({ field }) => (
                <SelectDropdown
                  options={propertyOptions}
                  value={propertyOptions.find(
                    (opt) => opt.value === field.value
                  )}
                  onChange={(selectedOption) =>
                    setValue("property", selectedOption.value, {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            />

            {errors.property && (
              <p className="text-red-500">{errors.property.message}</p>
            )}
          </div>

          <div className={styles.inputItem}>
            <label>Internal Access</label>
            <Controller
              control={control}
              name="internal"
              defaultValue=""
              rules={{ required: "Internal Access is required" }}
              render={({ field }) => (
                <SelectDropdown
                  options={internalOptions}
                  value={internalOptions.find(
                    (opt) => opt.value === field.value
                  )}
                  onChange={(selectedOption) =>
                    setValue("internal", selectedOption.value, {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            />

            {errors.internal && (
              <p className="text-red-500">{errors.internal.message}</p>
            )}
          </div>

          <div className={styles.inputItem}>
            <label>Truck Access</label>
            <Controller
              control={control}
              name="truck"
              rules={{ required: "Truck Access is required" }}
              render={({ field }) => (
                <SelectDropdown
                  options={truckOptions}
                  value={truckOptions.find((opt) => opt.value === field.value)}
                  onChange={(selectedOption) =>
                    setValue("truck", selectedOption.value)
                  }
                />
              )}
            />
            {errors.truck && (
              <p className="text-red-500">{errors.truck.message}</p>
            )}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>Type of property</label>
            <Controller
              control={control}
              name="propertyDropoff"
              defaultValue=""
              rules={{ required: "Type of property is required" }}
              render={({ field }) => (
                <SelectDropdown
                  options={propertyOptions}
                  value={propertyOptions.find(
                    (opt) => opt.value === field.value
                  )}
                  onChange={(selectedOption) =>
                    setValue("propertyDropoff", selectedOption.value, {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            />

            {errors.propertyDropoff && (
              <p className="text-red-500">{errors.propertyDropoff.message}</p>
            )}
          </div>

          <div className={styles.inputItem}>
            <label>Internal Access</label>
            <Controller
              control={control}
              name="internalDropoff"
              defaultValue=""
              rules={{ required: "Internal Access is required" }}
              render={({ field }) => (
                <SelectDropdown
                  options={internalOptions}
                  value={internalOptions.find(
                    (opt) => opt.value === field.value
                  )}
                  onChange={(selectedOption) =>
                    setValue("internalDropoff", selectedOption.value, {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            />

            {errors.internalDropoff && (
              <p className="text-red-500">{errors.internalDropoff.message}</p>
            )}
          </div>

          <div className={styles.inputItem}>
            <label>Truck Access</label>
            <Controller
              control={control}
              name="truckDropoff"
              rules={{ required: "Truck Access is required" }}
              render={({ field }) => (
                <SelectDropdown
                  options={truckOptions}
                  value={truckOptions.find((opt) => opt.value === field.value)}
                  onChange={(selectedOption) =>
                    setValue("truckDropoff", selectedOption.value)
                  }
                />
              )}
            />
            {errors.truckOptions && (
              <p className="text-red-500">{errors.truckOptions.message}</p>
            )}
          </div>
        </div> */}

        {/* Address Field */}
        <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 col-lg-12">
          <label>Address:</label>
          <input {...register("address")} className="border p-2 w-full" />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepThree;
