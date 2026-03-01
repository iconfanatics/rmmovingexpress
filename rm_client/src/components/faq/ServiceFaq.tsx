"use client";
import { ServiceFaqsItemsProps } from "@/@types/service";
import {
  ExpansionList,
  ExpansionPanel,
  usePanels,
} from "@react-md/expansion-panel";
import styles from "../../styles/component/_faq.module.scss";

export default function ServiceFaq(props: any) {
  let defaultExpandedIndex: number | number[] | undefined;
  const [panels, onKeyDown] = usePanels({
    count: props.faqsData?.length + Number(1),
    idPrefix: "configuring-panels",
    defaultExpandedIndex,
  });

  return (
    <div className="container">
      {props.faqsData ? (
        <div className={styles.expansionWrap}>
          <ExpansionList onKeyDown={onKeyDown}>
            {props.faqsData?.map(
              (item: ServiceFaqsItemsProps, index: number) => (
                <ExpansionPanel
                  key={`${item.id}-${index}`}
                  {...panels[Number(index)]}
                  header={item.title}
                  className={styles.expansionPanner}
                >
                  <p>{item.sub_title}</p>
                </ExpansionPanel>
              )
            )}
          </ExpansionList>
        </div>
      ) : null}
    </div>
  );
}
