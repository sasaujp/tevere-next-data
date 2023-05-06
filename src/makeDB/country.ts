import fs from "fs";

type CountryType = {
  coordinates?: string[];
  inception?: string[];
  dissolution?: string[];
  label?: {
    [key: string]: string;
  };
  flag?: string[];
  capital?: {
    [key: string]: {
      startTime?: string;
      endTime?: string;
      pointInTime?: string;
    };
  };
};

type CapitalType = {
  coordinates?: string[];
  label?: {
    [key: string]: string;
  };
};

type DataType<InstanceType> = {
  [key: string]: InstanceType;
};

function isoDateToYearMonthDay(isoDate: string) {
  const match = isoDate.match(/^(-?\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}Z$/);
  if (match) {
    return {
      year: parseInt(match[1], 10),
      month: parseInt(match[2], 10),
      day: parseInt(match[3], 10),
    };
  } else {
    throw new Error(`Invalid ISO date: ${isoDate}`);
    // return null;
    // console.log("iso date", isoDate);
    // throw new Error(`Invalid ISO date: ${isoDate}`);
  }
}

function parseCoordinates(coordinates: string) {
  const match = coordinates.match(/Point\(([-+]?\d+\.\d+) ([-+]?\d+\.\d+)\)/);
  if (match) {
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2]),
    };
  } else {
    throw new Error(`Invalid coordinates: ${coordinates}`);
    // return null;
  }
}
export function generateSqlFile(
  countriesData: DataType<CountryType>,
  capitalsData: DataType<CapitalType>,
  outputPath: string
) {
  const fileStream = fs.createWriteStream(outputPath);

  fileStream.write("BEGIN TRANSACTION;\n");

  fileStream.write("DROP TABLE IF EXISTS countries;\n");
  fileStream.write("DROP TABLE IF EXISTS country_labels;\n");
  fileStream.write("DROP TABLE IF EXISTS country_capital;\n");
  fileStream.write("DROP TABLE IF EXISTS capitals;\n");
  fileStream.write("DROP TABLE IF EXISTS capital_labels;\n");

  fileStream.write(`CREATE TABLE countries (
    id TEXT PRIMARY KEY,
    lat REAL,
    lon REAL,
    inception_y INTEGER,
    inception_m INTEGER,
    inception_d INTEGER,
    dissolution_y INTEGER,
    dissolution_m INTEGER,
    dissolution_d INTEGER,
    flag TEXT
  );
  CREATE INDEX idx_countries_inception_y ON countries (inception_y);
  CREATE INDEX idx_countries_dissolution_y ON countries (dissolution_y);

  CREATE TABLE country_labels (
    country_id TEXT,
    language TEXT,
    label TEXT,
    PRIMARY KEY (country_id, language),
    FOREIGN KEY (country_id) REFERENCES countries (id)
  );

  CREATE TABLE country_capital (
    country_id TEXT,
    capital_id TEXT,
    start_y INTEGER,
    start_m INTEGER,
    start_d INTEGER,
    end_y INTEGER,
    end_m INTEGER,
    end_d INTEGER,
    point_in_time_y INTEGER,
    point_in_time_m INTEGER,
    point_in_time_d INTEGER    
    PRIMARY KEY (country_id, capital_id),
    FOREIGN KEY (country_id) REFERENCES countries (id)
  );

  CREATE TABLE capitals (
    id TEXT PRIMARY KEY,
    lat REAL,
    lon REAL
  );

  CREATE TABLE capital_labels (
    capital_id TEXT,
    language TEXT,
    label TEXT,
    PRIMARY KEY (capital_id, language),
    FOREIGN KEY (capital_id) REFERENCES capitals (id)
  );\n`);

  for (const countryId in countriesData) {
    const country = countriesData[countryId];
    try {
      const inception = country.inception?.[0];
      const dissolution = country.dissolution?.[0];

      const coodinateValue = country.coordinates
        ? parseCoordinates(country.coordinates[0])
        : null;
      const lat = coodinateValue ? coodinateValue.latitude : "NULL";
      const lon = coodinateValue ? coodinateValue.longitude : "NULL";

      const inceptionDate = inception ? isoDateToYearMonthDay(inception) : null;
      const dissolutionDate = dissolution
        ? isoDateToYearMonthDay(dissolution)
        : null;
      const inception_y = inceptionDate ? inceptionDate.year : "NULL";
      const inception_m = inceptionDate ? inceptionDate.month : "NULL";
      const inception_d = inceptionDate ? inceptionDate.day : "NULL";

      const dissolution_y = dissolutionDate ? dissolutionDate.year : "NULL";
      const dissolution_m = dissolutionDate ? dissolutionDate.month : "NULL";
      const dissolution_d = dissolutionDate ? dissolutionDate.day : "NULL";

      const flag = country.flag ? country.flag[0] : "NULL";

      fileStream.write(
        `INSERT INTO countries (id, lat, lon, inception_y, inception_m, inception_d, dissolution_y, dissolution_m, dissolution_d, flag) VALUES ('${countryId}', ${lat}, ${lon}, ${inception_y}, ${inception_m}, ${inception_d}, ${dissolution_y}, ${dissolution_m}, ${dissolution_d}, '${flag}');\n`
      );

      for (const lang in country.label) {
        fileStream.write(
          `INSERT INTO country_labels (country_id, language, label) VALUES ('${countryId}', '${lang}', '${country.label[lang]}');\n`
        );
      }

      for (const capitalId in country.capital) {
        try {
          const capital = capitalsData[capitalId];
          const startTime = country.capital[capitalId].startTime;
          const endTime = country.capital[capitalId].endTime;
          const pointInTime = country.capital[capitalId].pointInTime;

          const startTimeDate = startTime
            ? isoDateToYearMonthDay(startTime)
            : null;
          const endTimeDate = endTime ? isoDateToYearMonthDay(endTime) : null;
          const pointInTimeDate = pointInTime
            ? isoDateToYearMonthDay(pointInTime)
            : null;

          const start_y = startTimeDate ? startTimeDate.year : "NULL";
          const start_m = startTimeDate ? startTimeDate.month : "NULL";
          const start_d = startTimeDate ? startTimeDate.day : "NULL";

          const end_y = endTimeDate ? endTimeDate.year : "NULL";
          const end_m = endTimeDate ? endTimeDate.month : "NULL";
          const end_d = endTimeDate ? endTimeDate.day : "NULL";

          const point_y = pointInTimeDate ? pointInTimeDate.year : "NULL";
          const point_m = pointInTimeDate ? pointInTimeDate.month : "NULL";
          const point_d = pointInTimeDate ? pointInTimeDate.day : "NULL";

          fileStream.write(
            `INSERT INTO country_capital (country_id, capital_id, start_y, start_m, start_d, end_y, end_m, end_d, point_y, point_m, point_d) VALUES ('${countryId}', '${capitalId}', ${start_y}, ${start_m}, ${start_d}, ${end_y}, ${end_m}, ${end_d}, ${point_y}, ${point_m}, ${point_d});\n`
          );

          if (capital) {
            const coodinateValue = capital.coordinates
              ? parseCoordinates(capital.coordinates[0])
              : null;
            const lat_cap = coodinateValue ? coodinateValue.latitude : "NULL";
            const lon_cap = coodinateValue ? coodinateValue.longitude : "NULL";

            fileStream.write(
              `INSERT OR IGNORE INTO capitals (id, lat, lon) VALUES ('${capitalId}', ${lat_cap}, ${lon_cap});\n`
            );

            for (const lang in capital.label) {
              fileStream.write(
                `INSERT OR IGNORE INTO capital_labels (capital_id, language, label) VALUES ('${capitalId}', '${lang}', '${capital.label[lang]}');\n`
              );
            }
          }
        } catch (e) {
          if (e instanceof Error) {
            console.log(countryId, capitalId, e.message);
          }
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        const label = country.label
          ? country.label["ja"] || country.label["en"]
          : "no label";
        console.log(
          "skip",
          countryId,
          label
          // e.message
        );
      }
    }
  }

  fileStream.write("COMMIT;\n");
  fileStream.end();
}
