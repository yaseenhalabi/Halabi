import React, { useState, useEffect } from "react";
import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { CartesianChart, Bar } from "victory-native";
import { Tag, Contact } from "../../utils/types";
import { getContactsWithTag } from "../../utils/helpers";
import getTheme from "../../utils/GetTheme";
import { useFont, LinearGradient, vec } from "@shopify/react-native-skia";
import CommonText from "../CommonText";

const poppinsBlack = require("../../assets/fonts/Poppins-Medium.ttf");
const PAGE_SIZE = 5;

type PercentageData = { tagName: string; percent: number };

type Props = {
  contacts: Contact[];
  tags: Tag[];
};

export default function TagPercentageChart({ contacts, tags }: Props) {
  const theme = getTheme();
  const width = Dimensions.get("window").width * 0.9;

  const [allPercentages, setAllPercentages] = useState<PercentageData[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    setLoadingData(true);
    requestAnimationFrame(() => {
      const total = contacts.length || 1;
      const computed = tags
        .map((tag) => ({
          tagName: truncateString(tag.name),
          percent: Number(
            ((getContactsWithTag(tag, contacts).length / total) * 100).toFixed(
              1
            )
          ),
        }))
        .filter((d) => d.percent > 0)
        .sort((a, b) => b.percent - a.percent);
      setAllPercentages(computed);
      setLoadingData(false);
    });
  }, [tags, contacts]);

  const pageCount = Math.max(1, Math.ceil(allPercentages.length / PAGE_SIZE));
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [allPercentages.length]);

  const pageData = allPercentages.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  const font = useFont(poppinsBlack, 10);

  if (!font || loadingData) {
    return (
      <View
        style={{
          height: 300,
          width: width - 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.text.full} />
      </View>
    );
  }

  const maxPercent = Math.max(...pageData.map((d) => d.percent), 0);
  const paddedMax = Math.ceil(maxPercent) + 5;
  if (pageData.length === 0)
    return (
      <View
        style={{
          height: 300,
          width: width - 30,
          marginTop: 25,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.name === "dark" ? "#121212" : "#f5f4f2",
          borderRadius: 20,
        }}
      >
        <CommonText size="xsmall">Not enought data.</CommonText>
        <CommonText size="xsmall">Tag more contacts</CommonText>
      </View>
    );
  return (
    <View style={{ height: 300, width: width - 30 }}>
      <CartesianChart
        data={pageData}
        xKey="tagName"
        yKeys={["percent"]}
        xAxis={{
          font,
          tickCount: pageData.length - 1,
          lineColor: theme.name === "dark" ? "#2e2e2e" : "#d6d6d6",
          labelColor: theme.text.full,
        }}
        yAxis={[
          {
            font,
            lineColor: theme.name === "dark" ? "#2e2e2e" : "#d6d6d6",
            labelColor: theme.text.full,
          },
        ]}
        domainPadding={{ left: 20, right: 20, top: 40 }}
        viewport={{ y: [0, paddedMax] }}
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
            hitSlop={10}
          >
            <Text style={{ color: theme.text.full, fontSize: 18 }}>‹</Text>
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
            hitSlop={10}
          >
            <Text style={{ color: theme.text.full, fontSize: 18 }}>›</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function truncateString(str: string) {
  return str.length > 10 ? str.slice(0, 10) + "..." : str;
}
