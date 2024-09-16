/**
 * Handles the import of a CSV file and processes the data.
 *
 * @template T - The type of data to be processed.
 * @param processData - A function that processes the data.
 * @param headers - An array of strings representing the headers of the CSV file.
 * @returns A promise that resolves when the CSV file is imported and the data is processed.
 */
const handleImportCSV = async <T>(processData: (data: T[]) => void, headers: string[]): Promise<void> => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';

  input.onchange = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const text = e.target?.result as string;

      const rows = text.split('\n');

      const data: T[] = rows.slice(1).map((row) => {
        const columns = row.split(',');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const item: any = {};
        headers.forEach((header, index) => {
          item[header] = columns[index];
        });

        item.id = '';
        return item;
      });

      processData(data);
    };

    reader.readAsText(file);
  };

  input.click();
};

export default handleImportCSV;
