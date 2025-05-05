import xml.etree.ElementTree as ET
import pandas as pd

# Загружаем XML файл
tree = ET.parse('yourfile.xml')
root = tree.getroot()

# Список атрибутов, которые ищем
attributes_to_collect = ['Comment', 'Process_id', 'Process_name', 'Process_time', 'Process_perc', 'Process_owner', 'Process_executors', 'Process_parent_id']

# Создаем список словарей, где каждый словарь — это одна строка таблицы
data_rows = []

for elem in root.iter():
    row = {}
    for attr in attributes_to_collect:
        # Получаем значение атрибута, если есть, иначе пустая строка
        row[attr] = elem.attrib.get(attr, '')
    if any(value != '' for value in row.values()):
        data_rows.append(row)
        #print(row)
#print(data_rows)

# Создаем DataFrame из списка словарей
df = pd.DataFrame(data_rows, columns=attributes_to_collect)

# Экспортируем в Excel
df.to_excel('attributes_table.xlsx', index=False)