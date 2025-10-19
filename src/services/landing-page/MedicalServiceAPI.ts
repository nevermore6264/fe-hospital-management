import { MedicalService, ServiceResponse } from "../types/MedicalService";

export class LandingPageMedicalServiceAPI {
  private static instance: LandingPageMedicalServiceAPI;
  private baseUrl: string = "/api/landing-page/services";

  private constructor() {}

  public static getInstance(): LandingPageMedicalServiceAPI {
    if (!LandingPageMedicalServiceAPI.instance) {
      LandingPageMedicalServiceAPI.instance =
        new LandingPageMedicalServiceAPI();
    }
    return LandingPageMedicalServiceAPI.instance;
  }

  // Lấy tất cả dịch vụ y tế cho landing page
  async getAllServices(): Promise<ServiceResponse> {
    try {
      // Mock delay để simulate API call
      await this.delay(500);

      const mockServices: MedicalService[] = [
        {
          id: "cardiology-001",
          title: "Tim mạch",
          description:
            "Chẩn đoán và điều trị các bệnh về tim mạch với công nghệ hiện đại",
          category: "cardiology",
          features: ["ECG", "Siêu âm tim", "Can thiệp mạch vành"],
          icon: "Heart",
          colors: {
            bg: "bg-red-100",
            border: "border-red-200",
            hover: "hover:border-red-300",
            gradient: "from-red-400 to-pink-500",
            icon: "text-red-600",
          },
          price: {
            consultation: 500000,
            followUp: 300000,
          },
          availability: {
            weekdays: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"],
            hours: "08:00 - 17:00",
          },
          doctors: ["Dr. Trần Thị Hương", "Dr. Nguyễn Văn Minh"],
        },
        {
          id: "internal-001",
          title: "Nội khoa",
          description:
            "Khám và điều trị chuyên sâu các bệnh nội khoa tổng quát",
          category: "internal",
          features: ["Tiểu đường", "Huyết áp", "Gan mật"],
          icon: "Stethoscope",
          colors: {
            bg: "bg-blue-100",
            border: "border-blue-200",
            hover: "hover:border-blue-300",
            gradient: "from-blue-400 to-cyan-500",
            icon: "text-blue-600",
          },
          price: {
            consultation: 400000,
            followUp: 250000,
          },
          availability: {
            weekdays: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
            hours: "07:30 - 18:00",
          },
          doctors: ["Dr. Lê Thị Lan", "Dr. Phạm Văn Đức"],
        },
        {
          id: "pediatrics-001",
          title: "Nhi khoa",
          description: "Chăm sóc sức khỏe toàn diện và tận tâm cho trẻ em",
          category: "pediatrics",
          features: ["Tiêm chủng", "Khám định kỳ", "Dinh dưỡng"],
          icon: "Baby",
          colors: {
            bg: "bg-green-100",
            border: "border-green-200",
            hover: "hover:border-green-300",
            gradient: "from-green-400 to-emerald-500",
            icon: "text-green-600",
          },
          price: {
            consultation: 350000,
            followUp: 200000,
          },
          availability: {
            weekdays: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"],
            hours: "08:00 - 16:30",
          },
          doctors: ["Dr. Hoàng Thị Mai", "Dr. Vũ Văn Tùng"],
        },
        {
          id: "surgery-001",
          title: "Ngoại khoa",
          description:
            "Phẫu thuật và điều trị ngoại khoa với kỹ thuật tiên tiến",
          category: "surgery",
          features: [
            "Phẫu thuật nội soi",
            "Phẫu thuật mở",
            "Phục hồi chức năng",
          ],
          icon: "Scissors",
          colors: {
            bg: "bg-purple-100",
            border: "border-purple-200",
            hover: "hover:border-purple-300",
            gradient: "from-purple-400 to-violet-500",
            icon: "text-purple-600",
          },
          price: {
            consultation: 600000,
            followUp: 400000,
          },
          availability: {
            weekdays: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5"],
            hours: "08:30 - 17:30",
          },
          doctors: ["Dr. Đặng Văn Hùng", "Dr. Bùi Thị Thu"],
        },
      ];

      return {
        success: true,
        data: mockServices,
        message: "Lấy danh sách dịch vụ thành công",
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: "Có lỗi xảy ra khi lấy danh sách dịch vụ",
      };
    }
  }

  // Lấy dịch vụ nổi bật cho landing page
  async getFeaturedServices(): Promise<ServiceResponse> {
    try {
      await this.delay(300);

      const allServices = await this.getAllServices();
      if (!allServices.success) {
        return allServices;
      }

      // Lấy 4 dịch vụ đầu tiên làm featured
      const featuredServices = allServices.data.slice(0, 4);

      return {
        success: true,
        data: featuredServices,
        message: "Lấy danh sách dịch vụ nổi bật thành công",
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: "Có lỗi xảy ra khi lấy dịch vụ nổi bật",
      };
    }
  }

  // Tìm kiếm dịch vụ cho landing page
  async searchServices(query: string): Promise<ServiceResponse> {
    try {
      await this.delay(600);

      const allServices = await this.getAllServices();
      if (!allServices.success) {
        return allServices;
      }

      const searchResults = allServices.data.filter(
        (service) =>
          service.title.toLowerCase().includes(query.toLowerCase()) ||
          service.description.toLowerCase().includes(query.toLowerCase()) ||
          service.features.some((feature) =>
            feature.toLowerCase().includes(query.toLowerCase())
          )
      );

      return {
        success: true,
        data: searchResults,
        message: `Tìm thấy ${searchResults.length} dịch vụ phù hợp`,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: "Có lỗi xảy ra khi tìm kiếm dịch vụ",
      };
    }
  }

  // Mock delay function
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const landingPageMedicalServiceAPI =
  LandingPageMedicalServiceAPI.getInstance();
