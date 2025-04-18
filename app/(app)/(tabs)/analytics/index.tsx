// analytics/index.tsx
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useSelector } from "react-redux";
import PageContainer from "../../../../components/PageContainer";
import CommonText from "../../../../components/CommonText";
import { CartesianChart, Bar, Line } from "victory-native";
import { Tag, Contact } from "../../../../utils/types";
import { getContactsWithTag } from "../../../../utils/helpers";
import getTheme from "../../../../utils/GetTheme";
import {
  useFont,
  Text,
  Group,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";

const poppinsBlack = require("../../../../assets/fonts/Poppins-Medium.ttf");
const CHART_THEME = {
  axis: {
    style: {
      tickLabels: {
        // this changed the color of my numbers to white
        fill: "white",
      },
    },
  },
};

export default function AnalyticsPage() {
  const contacts: Contact[] = useSelector((s: any) => s.contacts);
  const tags: Tag[] = useSelector((s: any) => s.tags);
  const theme = getTheme();
  const { width } = useWindowDimensions();

  /* ---------- fonts ---------- */
  const font = useFont(poppinsBlack, 10);
  if (!font) return null;

  /* ---------- data ---------- */
  const total = contacts.length || 1;
  const tagPercentages = tags
    .map((tag) => ({
      tagName: tag.name,
      percent: Number(
        ((getContactsWithTag(tag, contacts).length / total) * 100).toFixed(1)
      ),
    }))
    .filter((d) => d.percent > 0)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 10);

  /* ---------- render ---------- */
  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ height: 300, width: 300 }}>
          <CartesianChart
            data={tagPercentages} // 👈 specify your data
            xKey="tagName" // 👈 specify data key for x-axis
            yKeys={["percent"]} // 👈 specify data keys used for y-axis
            xAxis={{
              font,
              lineColor: theme.text.semi,
              labelColor: theme.text.full,
            }}
            yAxis={[
              { font, lineColor: theme.text.semi, labelColor: theme.text.full },
            ]}
            domainPadding={{ left: 20, right: 20, top: 40 }}
          >
            {/* 👇 render function exposes various data, such as points. */}
            {({ points, chartBounds }) => (
              // 👇 and we'll use the Line component to render a line path.
              <Bar
                barWidth={30}
                points={points.percent}
                chartBounds={chartBounds}
                labels={{ position: "top", font: font, color: theme.text.full }}
                color={theme.text.full}
                roundedCorners={{ topLeft: 10, topRight: 10 }}
              >
                <LinearGradient
                  start={vec(0, 0)} // top‑left of the bar
                  end={vec(0, 300)} // bottom‑left (same x, bigger y)
                  colors={["#156160", "#8B56D1"]}
                />
              </Bar>
            )}
          </CartesianChart>
        </View>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({});
