
// utils/priceCalculator.ts
import { FormData } from '../types/stepper';


type BHKType = '1' | '2' | '3' | '4';
type PackageType = 'Basic' | 'Premium' | 'Ultra Premium';
type SizeType = 'small' | 'large';
type RoomType = 'livingRoom' | 'kitchen' | 'bedroom' | 'bathroom' | 'dining';


type PriceTable = {
  [K in BHKType]: {
    [P in PackageType]: {
      [S in SizeType]: {
        [R in RoomType]: number;
      };
    };
  };
};

export type PriceRange = {
  range: string;
};

const priceTable: PriceTable = {
  '1': {
    'Basic': {
      'small': {
        'livingRoom': 33700, 'kitchen': 65000, 'bedroom': 79500,
        'bathroom': 6800, 'dining': 27200
      },
      'large': {
        'livingRoom': 46000, 'kitchen': 80000, 'bedroom': 85000,
        'bathroom': 6800, 'dining': 27200
      }
    },
    'Premium': {
      'small': {
        'livingRoom': 40440, 'kitchen': 78000, 'bedroom': 95400,
        'bathroom': 8160, 'dining': 32640
      },
      'large': {
        'livingRoom': 55200, 'kitchen': 96000, 'bedroom': 102000,
        'bathroom': 8160, 'dining': 32640
      }
    },
    'Ultra Premium': {
      'small': {
        'livingRoom': 47180, 'kitchen': 91000, 'bedroom': 111300,
        'bathroom': 9520, 'dining': 38080
      },
      'large': {
        'livingRoom': 64400, 'kitchen': 112000, 'bedroom': 119000,
        'bathroom': 9520, 'dining': 38080
      }
    }
  },
  '2': {
    'Basic': {
      'small': {
        'livingRoom': 33700, 'kitchen': 72000, 'bedroom': 159000,
        'bathroom': 13600, 'dining': 27200
      },
      'large': {
        'livingRoom': 46000, 'kitchen': 92000, 'bedroom': 170000,
        'bathroom': 13600, 'dining': 27200
      }
    },
    'Premium': {
      'small': {
        'livingRoom': 40440, 'kitchen': 86400, 'bedroom': 190800,
        'bathroom': 16320, 'dining': 32640
      },
      'large': {
        'livingRoom': 55200, 'kitchen': 110400, 'bedroom': 204000,
        'bathroom': 16320, 'dining': 32640
      }
    },
    'Ultra Premium': {
      'small': {
        'livingRoom': 47180, 'kitchen': 100800, 'bedroom': 222600,
        'bathroom': 19040, 'dining': 38080
      },
      'large': {
        'livingRoom': 64400, 'kitchen': 128800, 'bedroom': 238000,
        'bathroom': 19040, 'dining': 38080
      }
    }
  },
  '3': {
    'Basic': {
      'small': {
        'livingRoom': 43000, 'kitchen': 85000, 'bedroom': 238500,
        'bathroom': 20400, 'dining': 27200
      },
      'large': {
        'livingRoom': 52000, 'kitchen': 99000, 'bedroom': 255000,
        'bathroom': 20400, 'dining': 27200
      }
    },
    'Premium': {
      'small': {
        'livingRoom': 51600, 'kitchen': 102000, 'bedroom': 286200,
        'bathroom': 24480, 'dining': 32640
      },
      'large': {
        'livingRoom': 62400, 'kitchen': 118800, 'bedroom': 306000,
        'bathroom': 24480, 'dining': 32640
      }
    },
    'Ultra Premium': {
      'small': {
        'livingRoom': 60200, 'kitchen': 119000, 'bedroom': 333900,
        'bathroom': 28560, 'dining': 38080
      },
      'large': {
        'livingRoom': 72800, 'kitchen': 138600, 'bedroom': 357000,
        'bathroom': 28560, 'dining': 38080
      }
    }
  },
  '4': {
    'Basic': {
      'small': {
        'livingRoom': 52000, 'kitchen': 100000, 'bedroom': 318000,
        'bathroom': 27200, 'dining': 31500
      },
      'large': {
        'livingRoom': 65000, 'kitchen': 120000, 'bedroom': 340000,
        'bathroom': 27200, 'dining': 38000
      }
    },
    'Premium': {
      'small': {
        'livingRoom': 62400, 'kitchen': 120000, 'bedroom': 381600,
        'bathroom': 32640, 'dining': 37800
      },
      'large': {
        'livingRoom': 78000, 'kitchen': 144000, 'bedroom': 408000,
        'bathroom': 32640, 'dining': 45600
      }
    },
    'Ultra Premium': {
      'small': {
        'livingRoom': 72800, 'kitchen': 140000, 'bedroom': 445200,
        'bathroom': 38080, 'dining': 44100
      },
      'large': {
        'livingRoom': 91000, 'kitchen': 168000, 'bedroom': 476000,
        'bathroom': 38080, 'dining': 53200
      }
    }
  }
};



function getPriceRange(basePrice: number): { lower: number; upper: number } {
  return {
    lower: basePrice * 0.7, 
    upper: basePrice * 1.3  
  };
}



export function calculatePrice(formData: FormData): PriceRange {
  const bhk: BHKType = (['1', '2', '3', '4'].includes(formData.bhkType) 
    ? formData.bhkType 
    : '1') as BHKType;

  const size: SizeType = (formData.bhkSizes?.[bhk] || 'small') as SizeType;
  
  const pkg: PackageType = formData.package;

  const rooms = formData.rooms;
  const rates = priceTable[bhk][pkg][size];

  let totalLowerBound = 0;
  let totalUpperBound = 0;

  const livingRoomRange = getPriceRange(rates.livingRoom);
  totalLowerBound += rooms.livingRoom * livingRoomRange.lower;
  totalUpperBound += rooms.livingRoom * livingRoomRange.upper;

  const kitchenRange = getPriceRange(rates.kitchen);
  totalLowerBound += rooms.kitchen * kitchenRange.lower;
  totalUpperBound += rooms.kitchen * kitchenRange.upper;

  const bedroomRange = getPriceRange(rates.bedroom);
  totalLowerBound += rooms.bedroom * bedroomRange.lower;
  totalUpperBound += rooms.bedroom * bedroomRange.upper;

  const bathroomRange = getPriceRange(rates.bathroom);
  totalLowerBound += rooms.bathroom * bathroomRange.lower;
  totalUpperBound += rooms.bathroom * bathroomRange.upper;

  const diningRange = getPriceRange(rates.dining);
  totalLowerBound += rooms.dining * diningRange.lower;
  totalUpperBound += rooms.dining * diningRange.upper;

  return {
    range: formatLakhsRange(totalLowerBound, totalUpperBound)
  };
}


function formatLakhs(value: number): number {
  return Math.round(value / 10000) / 10; 
}

function formatLakhsRange(lower: number, upper: number): string {
  const min = formatLakhs(lower);
  const max = formatLakhs(upper);

  const roundedMin = min < 1 ? Math.round(min * 10) / 10 : Math.round(min);
  const roundedMax = max < 1 ? Math.round(max * 10) / 10 : Math.round(max);

  const suffix = 'L';

  if (roundedMin === roundedMax) {
    return `₹${roundedMin}${suffix}`;
  }

  return `₹${roundedMin}${suffix} → ₹${roundedMax}${suffix}`;
}
