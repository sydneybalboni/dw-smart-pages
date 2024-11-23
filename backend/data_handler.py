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
        exhibit_name = row['Exhibit']
        data_dict[exhibit_name] = {
            'english_beginner': row.get('Beginner', ''),
            'english_intermediate': row.get('Intermediate', ''),
            'english_advanced': row.get('Advanced', ''),
            'spanish_beginner': row.get('Spanish Beginner', ''),
            'spanish_intermediate': row.get('Spanish Intermediate', ''),
            'spanish_advanced': row.get('Spanish Advanced', '')
        }

    # TODO: Generate missing descriptions for each exhibit
    

    return data_dict