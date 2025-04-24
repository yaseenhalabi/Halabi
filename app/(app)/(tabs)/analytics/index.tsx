// analytics/index.tsx
import { View } from "react-native";
import { useSelector } from "react-redux";
import PageContainer from "../../../../components/PageContainer";
import CommonText from "../../../../components/CommonText";
import { Tag, Contact } from "../../../../utils/types";
import getTheme from "../../../../utils/GetTheme";
import TagPercentageChart from "../../../../components/analytics/TagPercentageChart";
import TopTagPair from "../../../../components/analytics/TopTagPair";
import CoOccurenceGraph from "../../../../components/analytics/CoOccurenceGraph";

export default function AnalyticsPage() {
  const contacts: Contact[] = useSelector((s: any) => s.contacts);
  const tags: Tag[] = useSelector((s: any) => s.tags);

  return (
    <PageContainer scrollEnabled style={{ paddingBottom: 200 }}>
      <CommonText size="small" weight="semiBold">
        Co-Occurrence Tag Graph
      </CommonText>
      <CoOccurenceGraph contacts={contacts} tags={tags} />
      <View style={{ height: 25 }} />
      <CommonText size="small" weight="semiBold">
        Percent of Contacts With Tag (%)
      </CommonText>
      <TagPercentageChart contacts={contacts} tags={tags} />
      <View style={{ height: 25 }} />
      <CommonText size="small" weight="semiBold">
        Most Common Tag Pair
      </CommonText>
      <View style={{ height: 10 }} />
      <TopTagPair tags={tags} contacts={contacts} />
    </PageContainer>
  );
}
