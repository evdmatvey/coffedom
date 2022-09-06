import React from "react";
import PresetCard from "../../components/PresetCard";
import Breadcrumb from "../../components/UI/Breadcrumb";
import { useGetPresetsWithLimitQuery } from "../../store/services/presets";
import styles from "./FinishedPresets.module.scss";

const FinishedPresets = () => {
  const { data: presets } = useGetPresetsWithLimitQuery(4);
  return (
    <div className={styles.preset}>
      <div className={styles.img}>
        <div className="container">
          <Breadcrumb elements={[["Главная", "/"]]} current="Готовые наборы" />
          <h1>Готовые Наборы</h1>
        </div>
      </div>
      <div className={styles.block}>
        {presets &&
          presets.map((preset) => (
            <PresetCard key={preset._id} preset={preset} />
          ))}
        {presets &&
          presets.map((preset) => (
            <PresetCard key={preset._id} preset={preset} />
          ))}
      </div>
    </div>
  );
};

export default FinishedPresets;
