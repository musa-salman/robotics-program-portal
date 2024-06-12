const handleImportCSV = async <T>(processData: (data: T[]) => void): Promise<void> => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';

  input.onchange = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const text = e.target?.result as string;

      const rows = text.split('\n').slice(1);

      const data: T[] = rows.map((row) => {
        const columns = row.split(',');
        return columns as unknown as T;
      });

      processData(data);
    };

    reader.readAsText(file);
  };

  input.click();
};

export default handleImportCSV;
