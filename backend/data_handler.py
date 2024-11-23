import pandas as pd
from desc_generator import generate_descriptions

def load_data():
    """
    Load data from a CSV file and structure it into a dictionary of dictionaries.
    The exhibit name is the key to the first dictionary, and the internal dictionaries
    contain keys for different language levels in English and Spanish.
    """
    # Read the CSV file into a DataFrame
    df = pd.read_csv('data/exhibits.csv')
    
    # Initialize the nested dictionary
    data_dict = {}
    
    # Iterate over each row in the DataFrame to populate the dictionary
    for _, row in df.iterrows():
        exhibit_name = row['exhibit']
        data_dict[exhibit_name] = {
            'en-US_beginner': row.get('en-US_beginner', ''),
            'en-US_intermediate': row.get('en-US_intermediate', ''),
            'en-US_advanced': row.get('en-US_advanced', ''),
            'es-MX_beginner': row.get('es-MX_beginner', ''),
            'es-MX_intermediate': row.get('es-MX_intermediate', ''),
            'es-MX_advanced': row.get('es-MX_advanced', '')
        }

    return data_dict