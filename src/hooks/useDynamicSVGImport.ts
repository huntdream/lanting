import { FC, SVGProps, useEffect, useRef, useState } from 'react';

type Icon = FC<SVGProps<SVGElement>>

const useDynamicSVGImport = (name: string): [Icon | undefined] => {
  const importedIconRef = useRef<Icon>();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const importSvgIcon = async (): Promise<void> => {
      try {
        importedIconRef.current = (
          await import(`../assets/icons/${name}.svg`)
        ).ReactComponent;
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    importSvgIcon();
  }, [name]);

  return [importedIconRef.current]
}

export default useDynamicSVGImport