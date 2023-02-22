from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/cities')
def cities():
    '''
    If we had a database for cities we could get the data from there.
    For now as we have one city, this is hard coded along with an extra
    city for the frontend to test their functionality.
    '''
    city_data = [
        {
            'cityName': 'New York City',
            'poiTypes': [
                'Museum',
                'Statue',
                'Mall',
                'Park',
                'Zoo',
                'Aquarium'
            ]
        },
        {
            'cityName': 'Chicago',
            'poiTypes': [
                'Museum',
                'Restaurant',
                'Beach',
                'Market',
                'Library',
                'Book Store'
            ]
        }
    ]
    return jsonify(city_data)

if __name__ == '__main__':
    app.run()