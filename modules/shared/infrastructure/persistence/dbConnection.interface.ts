export interface DBConnection {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
