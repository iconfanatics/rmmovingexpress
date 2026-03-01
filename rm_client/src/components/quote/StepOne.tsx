import Link from "next/link";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styles from "../../styles/component/quote.module.scss";
import Commercial from "../Icon/Commercial";
import NoIcon from "../Icon/NoIcon";
import Residential from "../Icon/Residential";
import YesIcon from "../Icon/YesIcon";
import RadioButton from "../RadioButton";
import SelectDropdown from "../SelectDropdown";

const movingOptions = [
  { value: "few-items", label: "Few Items" },
  { value: "2", label: "2 Person Office" },
  { value: "33", label: "3 - 10 Person Office" },
  { value: "11", label: "11 - 20 Person Office" },
  { value: "21", label: "21 - 30 Person Office" },
  { value: "31", label: "31+ Person Office" },
];

const typeOfMoveOptions = [
  {
    value: "residential",
    label: "Residential",
    Icon: <Residential Color="#484848" />,
  },
  {
    value: "commercial",
    label: "Commercial",
    Icon: <Commercial Color="#484848" />,
  },
];

const cubicMetresOptions = [
  { value: "no", label: "No", Icon: <NoIcon Color="#484848" /> },
  { value: "yes", label: "Yes", Icon: <YesIcon Color="#484848" /> },
];

const StepOne = () => {
  const [selected, setSelected] = useState<string>("biking");
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedCubicMetres = watch("cubicMetres"); // ✅ Watch cubicMetres, NOT moveType

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>Pickup (Moving From)</label>
            <input {...register("movingFrom")} />
            {errors.movingFrom && (
              <p className="txError">{errors.movingFrom.message}</p>
            )}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>Dropoff (Moving To)</label>
            <input {...register("movingTo")} />
            {errors.movingTo && (
              <p className={styles.inputTxError}>{errors.movingTo.message}</p>
            )}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>
              Let's continue <br />
              <p>
                Type of move <span>*</span>
              </p>
            </label>
            <Controller
              name="moveType"
              control={control}
              rules={{ required: "Type of move is required" }}
              render={({ field }) => (
                <div className={styles.customRadioWrap}>
                  <RadioButton
                    name={field.name}
                    value="residential"
                    label="Residential"
                    icon={<Residential Color="#484848" />}
                    checked={field.value === "residential"}
                    onChange={field.onChange}
                  />

                  <RadioButton
                    name={field.name}
                    value="commercial"
                    label="Commercial"
                    icon={<Commercial Color="#484848" />}
                    checked={field.value === "commercial"}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />
            {errors.moveType && (
              <p className={styles.inputTxError}>{errors.moveType.message}</p>
            )}
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>
              Do you know how many
              <br />
              <p>
                Cubic metres (m3) are we moving? <span>*</span>
              </p>
            </label>
            <Controller
              name="cubicMetres"
              control={control}
              rules={{ required: "Selection is required" }}
              render={({ field }) => (
                <div className={styles.customRadioWrap}>
                  <RadioButton
                    name={field.name}
                    value="no"
                    label="No"
                    icon={<NoIcon Color="#484848" />}
                    checked={field.value === "no"}
                    onChange={field.onChange}
                  />

                  <RadioButton
                    name={field.name}
                    value="yes"
                    label="Yes"
                    icon={<YesIcon Color="#484848" />}
                    checked={field.value === "yes"}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />
            {errors.cubicMetres && (
              <p className={styles.inputTxError}>
                {errors.cubicMetres.message}
              </p>
            )}
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6"></div>

        {/* Show range input when cubicMetres is "no" */}
        {selectedCubicMetres === "no" && (
          <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <div className={styles.selectItem}>
              <label>
                How much are we moving? <span>*</span>
              </label>
              <Controller
                control={control}
                name="muchMoving"
                defaultValue=""
                render={({ field }) => (
                  <SelectDropdown
                    options={movingOptions}
                    value={movingOptions.find(
                      (opt) => opt.value === field.value
                    )}
                    onChange={(selectedOption) =>
                      setValue("muchMoving", selectedOption.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                )}
              />
            </div>
          </div>
        )}
        {/* Show range input when cubicMetres is "yes" */}
        {selectedCubicMetres === "yes" && (
          <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <div className={styles.rangeQuote}>
              <p>{watch("selectedRange") || 35} m3</p>
              <input
                type="range"
                {...register("selectedRange")}
                min="10"
                max="60"
                className="w-full"
              />
              <div className={styles.rangeSpace}>
                <span>10 m3</span>
                <span>60 m3</span>
              </div>
              <div className={styles.cubicMeterLink}>
                Use our <Link href="sdfs">cubic meter calculator</Link> if
                unsure.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepOne;
