import pandas as pd

def load_data(file_path):
    """
    Load data from a CSV file and structure it into a dictionary of dictionaries.
    The exhibit name is the key to the first dictionary, and the internal dictionaries
    contain keys for different language levels in English and Spanish.

    Args:
        file_path (str): The path to the CSV file.

    Returns:
        dict: A nested dictionary with the structured data.
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
            # Assuming similar structure for Spanish columns (update if different)
            'spanish_beginner': row.get('Spanish Beginner', ''),
            'spanish_intermediate': row.get('Spanish Intermediate', ''),
            'spanish_advanced': row.get('Spanish Advanced', '')
        }
    
    return data_dict