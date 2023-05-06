import json


def main():
    country = json.load(open('results/country.json'))
    capital = json.load(open('results/capital.json'))
    country_set = set(country.keys())
    cpaital_set = set(capital.keys())
    intersection_set = country_set & cpaital_set

    for uri in sorted(intersection_set):
        print(uri)
    print(len(intersection_set))

if __name__ == '__main__':
    main()