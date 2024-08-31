import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { MantineProvider, Global } from "@mantine/core";

dayjs.extend(advancedFormat);

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Global
        styles={(theme) => ({
          body: {
            background: "rgb(5, 5, 10) !important",
            color: `${theme.colors.gray[0]} !important`,
          },
        })}
      />

      <MantineProvider
        theme={{
          primaryColor: "green",
          colorScheme: "dark",
          defaultRadius: "md",
          transitionTimingFunction: "ease-in-out",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
};

export default MyApp;
