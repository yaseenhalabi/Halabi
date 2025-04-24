import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { CartesianChart, Bar } from "victory-native";
import { Tag, Contact } from "../../utils/types";
import { getContactsWithTag } from "../../utils/helpers";
import getTheme from "../../utils/GetTheme";
import { useFont, LinearGradient, vec } from "@shopify/react-native-skia";

const poppinsBlack = require("../../assets/fonts/Poppins-Medium.ttf");
const PAGE_SIZE = 5;

type Props = {
  contacts: Contact[];
  tags: Tag[];
};

export default function TagPercentageChart({ contacts, tags }: Props) {
  const theme = getTheme();
  const { width } = useWindowDimensions();

  /* ---------- font ---------- */

  /* ---------- derive percentages once ---------- */
  const allPercentages = useMemo(() => {
    const total = contacts.length || 1;

    return tags
      .map((tag) => ({
        tagName: tag.name,
        percent: Number(
          ((getContactsWithTag(tag, contacts).length / total) * 100).toFixed(1)
        ),
      }))
      .filter((d) => d.percent > 0)
      .sort((a, b) => b.percent - a.percent);
  }, [tags, contacts]);

  /* ---------- pagination ---------- */
  const pageCount = Math.ceil(allPercentages.length / PAGE_SIZE) || 1;
  const [page, setPage] = useState(0);

  /* reset to first page when data set changes */
  useEffect(() => setPage(0), [allPercentages.length]);

  /* slice for current page */
  const pageData = allPercentages.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  const font = useFont(poppinsBlack, 10);
  if (!font) return null;
  /* ---------- render ---------- */
  return (
    <View style={{ height: 300, width: width - 30 }}>
      <CartesianChart
        data={pageData}
        xKey="tagName"
        yKeys={["percent"]}
        xAxis={{
          font,
          tickCount: pageData.length - 1,
          lineColor: theme.text.semi,
          labelColor: theme.text.full,
        }}
        yAxis={[
          { font, lineColor: theme.text.semi, labelColor: theme.text.full },
        ]}
        domainPadding={{ left: 20, right: 20, top: 40 }}
        viewport={{ y: [0, 100] }}
      >
        {({ points, chartBounds }) => (
          <Bar
            barWidth={30}
            points={points.percent}
            chartBounds={chartBounds}
            labels={{ position: "top", font, color: theme.text.full }}
            color={theme.text.full}
            roundedCorners={{ topLeft: 10, topRight: 10 }}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, 300)}
              colors={["#156160", "#8B56D1"]}
            />
          </Bar>
        )}
      </CartesianChart>

      {/* ---------- pager controls ---------- */}
      {pageCount > 1 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
            gap: 12,
          }}
        >
          <TouchableOpacity
            disabled={page === 0}
            onPress={() => setPage((p) => Math.max(0, p - 1))}
            style={{ opacity: page === 0 ? 0.3 : 1, padding: 6 }}
          >
            <Text style={{ color: theme.text.full, fontSize: 18 }}>{"‹"}</Text>
          </TouchableOpacity>

          <Text
            style={{
              color: theme.text.full,
              fontFamily: "System",
              fontSize: 14,
            }}
          >
            {`${page + 1} / ${pageCount}`}
          </Text>

          <TouchableOpacity
            disabled={page === pageCount - 1}
            onPress={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            style={{ opacity: page === pageCount - 1 ? 0.3 : 1, padding: 6 }}
          >
            <Text style={{ color: theme.text.full, fontSize: 18 }}>{"›"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
